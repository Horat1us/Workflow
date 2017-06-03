<?php
namespace App\Console\Commands;
/**
 * Created by PhpStorm.
 * User: horat1us
 * Date: 4/2/17
 * Time: 7:02 PM
 */
/**
 * Class CreateUser
 * @package App\Console\Commands
 */
class CreateUser extends \Illuminate\Console\Command
{
    /**
     * @var string
     */
    protected $signature = 'make:user';
    public function handle()
    {
        $name = $this->ask('Enter user name');
        $email = $this->ask("Enter email for user");

        do {
            if (isset($password)) {
                $this->error("Passwords does not match!");
            }
            $password = $this->secret("Enter password");
            $confirm = $this->secret("Enter password confirm");
        } while ($password !== $confirm);

        $confirm = $this->confirm("Do you really want to create user $name with email $email?", true);
        if (!$confirm) {
            $this->warn("Canceling..");
            return;
        }

        $user = new \App\User([
            'name' => $name,
            'email' => $email,
        ]);
        $user->password = password_hash($password, PASSWORD_BCRYPT);
        $user->saveOrFail();
        $this->info("User #{$user->id} created.");
    }
}