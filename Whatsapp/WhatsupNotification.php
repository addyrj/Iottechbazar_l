<?php 
namespace App\Library;

use Auth;
use App\Models\User;
use App\Models\Order;
use App\Library\Slug;
use App\Models\Admin;
use App\Library\Masked;
use App\Traits\WhatsupTrait;
use App\Models\WhatsupMessageSent;

class WhatsupNotification{

    use WhatsupTrait;

    #Bind User Model
    protected $user;
    
    #Bind slug Library
    protected $slug;
    
    #Bind admin Model
    protected $admin;
    
    #Bind Order Model
    protected $order;

    #Bind Masked library
    protected $masked;

    #Bind WhatsupMessageSent Model
    protected $whatsupMessageSent;

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
                                Admin $admin,
                                WhatsupMessageSent $whatsupMessageSent
                                )
    {
      $this->slug                = $slug;
      $this->user                = $user;
      $this->order               = $order;
      $this->masked              = $masked;
      $this->admin               = $admin;
      $this->whatsupMessageSent  = $whatsupMessageSent;
    }
    
    /**
     * @method Order Placed 
     * @param 
     * @return response
     */
    public function orderPlaced($orderSlug)
    {
    	#Get Order Detail
        $orderDetails = $this->OrderDetail($orderSlug);
        #Get the date in formate
        //$date = date('Y-m-d',strtotime($orderDetails->created_at));
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
                                    "phoneNumber": '.$orderDetails->contact.',
                                    "callbackData": "callback data",
                                    "type": "Template",
                                    "template": {
                                        "name": "iottechbazaar_order_placed",
                                        "languageCode": "en",
                                        "headerValues": [
                                                         "'.$orderDetails->name.'"
                                        ],
                                        "bodyValues": [
                                                       "'.$orderDetails->order_no.'"
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
       if(Auth::guard('admin')->user()){
        #Set data variable
        $responseData = [
                         'slug'        => $this->slug->shortSlug() ??'',
                         'order_id'    => $orderDetails->id ??'',
                         'whatsup_id'  => $responseData->id ??'',
                         'contact'     => $orderDetails->contact ??'',
                         'result'      => $responseData->result ??'',
                         'message'     => $responseData->message ??'',
                         'added_by'    => $this->masked->authId() ??'',
                        ];
        $this->whatsupMessageSent->create($responseData);
       }
        return true;

    }

    /**
     * @method Order Approved
     * @param
     * @return response
     */
    public function orderApproved($orderSlug)
    {
        #Get Order Detail
        $orderDetails = $this->OrderDetail($orderSlug);
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
                                    "phoneNumber": '.$orderDetails->contact.',
                                    "callbackData": "callback data",
                                    "type": "Template",
                                    "template": {
                                        "name": "order_approved",
                                        "languageCode": "en",
                                        "headerValues": [
                                                         "'.$orderDetails->name.'"
                                        ],
                                        "bodyValues": [
                                                       "'.$orderDetails->order_no.'"
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
        //$responseData = json_decode($response);
        curl_close($curl); 
        return true;
    }

    /**
     * @method Order Shipped
     * @param
     * @return response
     */
    public function orderShipped($orderSlug)
    {
        #Get Order Detail
        $orderDetails = $this->OrderDetail($orderSlug);
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
                                    "phoneNumber": '.$orderDetails->contact.',
                                    "callbackData": "callback data",
                                    "type": "Template",
                                    "template": {
                                        "name": "iottechbazaar_order_shipment",
                                        "languageCode": "en",
                                        "headerValues": [
                                                         "'.$orderDetails->name.'"
                                        ],
                                        "bodyValues": [
                                                       "'.$orderDetails->order_no.'"
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
        
        return true;
    }

    /**
     * @method Order Completed
     * @param
     * @return response
     */
    public function orderCompleted($orderSlug)
    {
        #Get Order Detail
        $orderDetails = $this->OrderDetail($orderSlug);
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
                                    "phoneNumber": '.$orderDetails->contact.',
                                    "callbackData": "callback data",
                                    "type": "Template",
                                    "template": {
                                        "name": "order_completed",
                                        "languageCode": "en",
                                        "headerValues": [
                                                         "'.$orderDetails->name.'"
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
        return true;
    }

    /**
     * @method Order Canceled
     * @param
     * @return response
     */ 
    public function orderCanceled($orderSlug)
    {
        #Get Order Detail
        $orderDetails = $this->OrderDetail($orderSlug);
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
                                    "phoneNumber": '.$orderDetails->contact.',
                                    "callbackData": "callback data",
                                    "type": "Template",
                                    "template": {
                                        "name": "order_cancelled",
                                        "languageCode": "en",
                                        "headerValues": [
                                                         "'.$orderDetails->name.'"
                                        ],
                                        "bodyValues": [
                                                       "'.$orderDetails->order_no.'"
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
        //$responseData = json_decode($response);
        curl_close($curl); 
        return true;

    }

    /**
     * @method Get Order details
     * @param order slug
     * @return order details
     */ 
    public function OrderDetail($orderSlug)
    {
       $orderDetails = $this->order->whereSlug($orderSlug)->first();
       return $orderDetails;
    }
    
    /**
     * @method Order Received Admin Message
     * @param
     * @return response
     */
    public function orderReceivedMessage($customerName,$orderId,$orderValue)
    {
        $settings = $this->admin->where('role','Superadmin')->first();
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
                                    "phoneNumber": '.$settings->contact.',
                                    "callbackData": "callback data",
                                    "type": "Template",
                                    "template": {
                                        "name": "order_received",
                                        "languageCode": "en",
                                        "headerValues": [
                                                         "'.$settings->name.'"
                                        ],
                                        "bodyValues": [
                                                       "'.$customerName.'",
                                                       "'.$orderId.'",
                                                       "'.$orderValue.'"
                                        ]
                                    }
                                }',
                    CURLOPT_HTTPHEADER => array(
                      'Authorization: Basic '.$this->secret_key,
                      'Content-Type: application/json'
                    ),
        ));
        curl_exec($curl);
        
        curl_close($curl); 
        
        return true;
    }
}
?>