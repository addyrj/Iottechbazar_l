<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use App\Models\Order;
use App\Library\Slug;
use App\Models\Product;
use App\Library\Masked;
use App\Models\Shipping;
use App\Library\GetProduct;
use App\Traits\WhatsupTrait;
use App\Models\ShippingDetail;
use App\Models\ProductOrderDetail;
use App\Models\WhatsupMessageSent;
use App\Library\WhatsupNotification;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class WhatsupController extends Controller
{
    use WhatsupTrait;
    
    #Bind shipping view
    protected $view = "admin.shipping";

    #Bind User Model
    protected $user;
    
    #Bind slug Library
    protected $slug;

    #Bind Order Model
    protected $order;

    #Bind Product Model
    protected $product;

    #Bind Masked library
    protected $masked;

    #Bind Shipping Model
    protected $shipping;

    #Bind GetProduct library
    protected $getProduct;

    #Bind ShippingDetail Model
    protected $shippingDetail;
    
    #Bind WhatsupMessageSent Model
    protected $whatsupMessageSent;

    #Bind ProductOrderDetail Model
    protected $productOrderDetail;

    #Bind WhatsupNotification library
    protected $whatsupNotification;

    /**
     * @method Defining default constructor for controller
     * @param  
     * @return 
     */ 
    public function __construct(
                                User $user, 
                                Slug $slug,
                                Order $order,
                                Masked $masked,
                                Product $product,
                                Shipping $shipping,
                                GetProduct $getProduct,
                                ShippingDetail $shippingDetail,
                                WhatsupMessageSent $whatsupMessageSent,
                                ProductOrderDetail $productOrderDetail,
                                WhatsupNotification $whatsupNotification
                                )
    {
      $this->slug                = $slug;
      $this->user                = $user;
      $this->order               = $order;
      $this->masked              = $masked;
      $this->product             = $product;
      $this->shipping            = $shipping;
      $this->getProduct          = $getProduct;
      $this->shippingDetail      = $shippingDetail;
      $this->productOrderDetail  = $productOrderDetail;
      $this->whatsupMessageSent  = $whatsupMessageSent;
      $this->whatsupNotification = $whatsupNotification;
    }

    /**
     * @method Send whats up Notiofication after order approval
     * @param number and test msg
     * @return response
     */ 
    public function index()
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
                                CURLOPT_URL => 'https://api.interakt.ai/v1/public/message/',
                                CURLOPT_RETURNTRANSFER => true,
                                CURLOPT_ENCODING => '',
                                CURLOPT_MAXREDIRS => 10,
                                CURLOPT_TIMEOUT => 0,
                                CURLOPT_FOLLOWLOCATION => true,
                                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                                CURLOPT_CUSTOMREQUEST => 'POST',
                                CURLOPT_POSTFIELDS =>'{
                                  "countryCode": "+91",
                                  "phoneNumber": "9807912518",
                                  "callbackData": "Hello mayur",
                                  "type": "Template",
                                  "template": {
                                      "name": "diwali_offers_w7",
                                      "languageCode": "hi",
                                      "headerValues": [
                                          
                                      ],
                                      "bodyValues": [
                                        
                                      ]
                                  }
                               }',
                    CURLOPT_HTTPHEADER => array(
                      'Authorization: Basic '.$this->secret_key,
                      'Content-Type: application/json'
                    ),
        ));
        $response = curl_exec($curl);
        #decode the coming response
        $responseData = json_decode($response);
        curl_close($curl); 
        dd($responseData);
        return true;

    }
    
    /**
     * 
     * 
     * 
     */ 
    public function index2($slug)
    {
        //$this->whatsupNotification->orderPlaced($slug);

        //$data =$this->whatsupNotification->orderApproved($slug);

        //$data =$this->whatsupNotification->orderCanceled($slug);
        //$data =$this->whatsupNotification->orderShipped($slug);
        $data =$this->whatsupNotification->orderCompleted($slug);
        dd($data);
    }

}


