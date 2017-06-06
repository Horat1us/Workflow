<?php

namespace App\Providers;

use App\Role;
use App\User;
use Illuminate\Contracts\Auth\Access\Gate as GateContract;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot(GateContract $gate)
    {
        $this->registerPolicies();

        $gate->before(function (User $user, string $ability): bool {
            return $user->roles
                ->reduce(function ($carry, Role $permission) use ($ability) : bool {
                    return $carry || (string)$permission === $ability;
                }, false);
        });
    }
}
