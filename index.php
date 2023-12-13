<?php
// Assuming this PHP script is included or loaded in your server environment

// Function to perform Basic Authentication
function getBasicAuthHeader($username, $password) {
    $credentials = base64_encode($username . ':' . $password);
    return 'Basic ' . $credentials;
}

// Function to create a new chat using cURL
function createNewChat($basicAuth, $apiEndpoint, $payload) {
    $headers = [
        'Authorization: ' . $basicAuth,
        'Content-Type: application/json',
    ];

    $ch = curl_init($apiEndpoint);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    
    curl_close($ch);

    return [
        'status' => $httpCode,
        'response' => json_decode($response, true),
    ];
}

// Function to retrieve a list of chats
function getChats($apiEndpoint, $basicAuth) {
    $headers = [
        'Authorization: ' . $basicAuth,
    ];

    $ch = curl_init($apiEndpoint);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    
    curl_close($ch);

    return [
        'status' => $httpCode,
        'response' => json_decode($response, true),
    ];
}

// Define your API credentials and endpoint
$username = 'wellspring';
$password = 'grjfa8rkaojk4c85';
$apiEndpoint = 'https://newson-health.trainmy.net/api/v1/chats';

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['submit'])) {
    // Fetch form data
    $kb = 'wellspring-live';
    $method = 'gpt35-chat-5-refs';
    $title = 'Chat 1';
    $message = $_POST['message'];

    // Create payload
    $payload = [
        'kb' => $kb,
        'method' => $method,
        'title' => $title,
        'message' => $message,
    ];

    // Generate Basic Authentication header
    $basicAuth = getBasicAuthHeader($username, $password);

    // Create new chat
    $result = createNewChat($basicAuth, $apiEndpoint, $payload);

    // Handle the result as needed
    if ($result['status'] === 200 && isset($result['response']['chatid'])) {
        // Chat created successfully
        // Save the chat data to local storage or perform any other actions
        $chatId = $result['response']['chatid'];
        // ...
    } else {
        // Error handling
        $errorMessage = isset($result['response']['error']) ? $result['response']['error'] : 'Unknown error';
        echo 'Error creating new chat: ' . $errorMessage;
    }
}

// Retrieve and display the list of chats
$chatListResult = getChats($apiEndpoint, $basicAuth);
if ($chatListResult['status'] === 200 && isset($chatListResult['response'])) {
    $chats = $chatListResult['response'];
} else {
    $chats = [];
}

?>

<!-- HTML Form -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create New Chat</title>
</head>
<body>

    <!-- Form for creating a new chat -->
    <form method="post" action="">
        <label for="message">Message:</label>
        <input type="text" id="message" name="message" required>
        <button type="submit" name="submit">Submit</button>
    </form>

    <!-- Display the list of chats -->
    <?php if (!empty($chats)) : ?>
        <h2>Chats:</h2>
        <ul>
            <?php foreach ($chats as $chat) : ?>
                <li><?php echo $chat['title']; ?> - <?php echo $chat['message']; ?></li>
            <?php endforeach; ?>
        </ul>
    <?php else : ?>
        <p>No chats available.</p>
    <?php endif; ?>

      <!-- Display API response -->
      <?php if (isset($result['response'])) : ?>
        <h2>API Response:</h2>
        <pre><?php print_r($result['response']); ?></pre>
    <?php endif; ?>
<!-- JavaScript for logging status to console -->
<script>
        <?php
            // Print status information to the console
            echo "console.log('Status:', " . json_encode($result['status']) . ");";
        ?>
    </script>
</body>
</html>
