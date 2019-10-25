<?php

//Inicjalizacja biblioteki CURL
$curl = curl_init();
//Ustawienie adresu z którego zostaną pobrane dane
$url = "https://api.emaillabs.net.pl/api/sendmail";
//Ustawienie klucza App Key
$appkey = '5c747654788b3f8e2457191329d69619679fbf9e';
//Ustawienie klucza Secret Key
$secret = 'd0a0fed3751e697321c31cacda87695b124a22c0';

//Tworzenie kryteriów wysyłki
$data = array(
    'to' => array(
        "kontakt@litpay.pl",
    ),
    'smtp_account' => '4.automater.smtp',
    'subject' => 'Zapytanie ze strony od ' . htmlentities($_POST['name'] . ' ' . $_POST['surname']),
    'text' => ("Od: " . $_POST['name'] . ' ' . $_POST['surmame'] . "\nE-mail: " . $_POST['email'] . "\nNumer telefonu: " . $_POST['phone'] . "\n\n" . $_POST['message']),
    'from' => 'kontakt@litpay.pl',
    'from_name' => 'Formularz',
    'reply_to' => $_POST['email']
);

//Ustawienie metody POST
curl_setopt($curl, CURLOPT_POST, 1);
//Przekazanie danych do POST
curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($data));
//Ustawianie typu autoryzacji
curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
//Przekazywanie danych do logowania
curl_setopt($curl, CURLOPT_USERPWD, "$appkey:$secret");
//Przekazywania adresu URL z akcją
curl_setopt($curl, CURLOPT_URL, $url);
//Ustawienia dotyczące zwrotu z serwera
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
//Pobieranie wyniku
$result = curl_exec($curl);

//Wyświetlanie wyniku
echo '1';
exit;