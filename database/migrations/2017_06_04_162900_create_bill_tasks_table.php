<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBillTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bill_tasks', function (Blueprint $table) {
            $table->unsignedInteger('bill_id');
            $table->unsignedInteger('task_id');

            $table
                ->foreign('bill_id')
                ->references('id')
                ->on('bills')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table
                ->foreign('task_id')
                ->references('id')
                ->on('tasks')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->primary(['bill_id', 'task_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bill_tasks');
    }
}
