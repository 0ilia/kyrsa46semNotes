<?php
  function generateSalt()
    {
        $salt = '';
        for ($i = 0; $i < 13; $i++) {
            $salt .= chr(mt_rand(33, 126)); //символ из ASCII-table
        }
        return $salt;
    }