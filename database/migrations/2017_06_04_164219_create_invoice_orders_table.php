<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInvoiceOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoice_orders', function (Blueprint $table) {
            $table->unsignedInteger('invoice_id');
            $table->unsignedInteger('order_id');

            $table
                ->foreign('invoice_id')
                ->references('id')
                ->on('invoices')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table
                ->foreign('order_id')
                ->references('id')
                ->on('orders')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->primary(['order_id', 'invoice_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('invoice_orders');
    }
}
