<?php

/**
 * Backend api for PhysikOnline's support widget.
 * Sends a mail to our support address.
 *
 * Author: Lars Gröber
 */

// maybe only allow access from *.uni-frankfurt.de sites?
header("Access-Control-Allow-Origin: *");

class Mail
{
    /**
     * Function sends a mail to an address.
     * @param $subject string       The subject of the message.
     * @param $body string          The body of the message.
     * @param $to string            Address to send mail to.
     */
    static public function send ( $subject, $body, $to )
    {
        $headers = "Content-Type: text/plain; charset=UTF-8";
        mail( $to, $subject, $body, $headers );
    }
}

if (isset($_GET)) {
    $address = "lars@groeber-hg.de";
    $subject = $_GET["subject"];
    if (!$subject) $subject = "Test";
    $userMail = $_GET["user_mail"];
    $userName = $_GET["user_name"];
    $messageType = $_GET["message_type"];
    $body = $_GET["body"];
    
    if (!$body || !$userMail || !$userName || !$subject || !$messageType) errorHandler();
    
    $subject = "[Support] " . $subject . " - type: " . $messageType;

    $info = "This message was send by PhysikOnline's support-widget.\n\n";
    $info .= "The user's name is:  " . $userName . "\n";
    $info .= "The user's email is: " . $userMail . "\n";
    $info .= "\nThe user left the following message:\n\n";
    $body = $info . $body;

    Mail::send($subject, $body, $address);
    echo "Success";
} else {
    errorHandler();
}

function errorHandler() {
    header("http/1.1 400 Bad Request");
    die("Missing parameters!");
}
