<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\HttpException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        AuthorizationException::class,
        HttpException::class,
        ModelNotFoundException::class,
        ValidationException::class,
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception $e
     * @return void
     */
    public function report(Exception $e)
    {
        parent::report($e);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Exception $e
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    public function render($request, Exception $e)
    {
        if ($e instanceof ValidationException) {
            return $this->renderValidation($e);
        }

        $response = ['success' => false];
        if(app()->environment('local')) {
            $response += [
                'exception' => get_class($e),
                'message' => $e->getMessage(),
                'code' => $e->getCode(),
                'trace' => $e->getTrace(),
            ];
        }

        return response()->json($response);
    }

    /**
     * @param ValidationException $ex
     * @return \Illuminate\Http\JsonResponse
     */
    public function renderValidation(ValidationException $ex)
    {
        $errors = $ex->validator->getMessageBag()->toArray();
        return response()->json([
            'success' => false,
            'errors' => array_combine(array_keys($errors), array_column($errors, 0))
        ]);
    }
}