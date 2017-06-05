<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEmployeeLanguagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employee_languages', function (Blueprint $table) {
            $table->unsignedInteger('employee_id');
            $table->string('source');
            $table->string('target');
            $table->decimal('price');

            $table->foreign('employee_id')
                ->references('id')
                ->on('staff')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('source')
                ->references('code')
                ->on('languages')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('target')
                ->references('code')
                ->on('languages')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->primary(['employee_id', 'source', 'target']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('employee_languages');
    }
}
