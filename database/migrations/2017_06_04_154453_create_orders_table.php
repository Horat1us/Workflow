<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('customer_id');
            $table->unsignedInteger('source_id');
            $table->unsignedInteger('target_id');
            $table->decimal('price', 8, 2);
            $table->enum('status', [
                'created',
                'confirmed',
                'canceled',
                'pending',
                'finished',
                'closed',
            ]);
            $table->string('name')->nullable();
            $table->timestamps();

            $table
                ->foreign('customer_id')
                ->references('id')
                ->on('customers')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table
                ->foreign('source_id')
                ->references('id')
                ->on('languages')
                ->onDelete('restrict')
                ->onUpdate('cascade');

            $table
                ->foreign('target_id')
                ->references('id')
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
        Schema::dropIfExists('orders');
    }
}
