<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('order_id');
            $table->unsignedInteger('employee_id');
            $table->decimal('price', 8, 2);
            $table->string('name');
            $table->timestamp('deadline');
            $table->enum('status', [
                'created',
                'confirmed',
                'canceled',
                'progress',
                'finished',
                'closed',
            ]);
            $table->timestamps();

            $table
                ->foreign('order_id')
                ->references('id')
                ->on('orders')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table
                ->foreign('employee_id')
                ->references('staff')
                ->on('id')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tasks');
    }
}
