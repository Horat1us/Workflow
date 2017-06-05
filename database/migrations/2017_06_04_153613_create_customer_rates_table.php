<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCustomerRatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customer_rates', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('customer_id');
            $table->unsignedInteger('source');
            $table->unsignedInteger('target');
            $table->decimal('price', 8, 2);
            $table->timestamps();

            $table
                ->foreign('customer_id')
                ->references('id')
                ->on('customers')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table
                ->foreign('source_id')
                ->references('code')
                ->on('languages')
                ->onDelete('restrict')
                ->onUpdate('cascade');

            $table
                ->foreign('target_id')
                ->references('code')
                ->on('languages')
                ->onDelete('restrict')
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
        Schema::dropIfExists('customer_rates');
    }
}
