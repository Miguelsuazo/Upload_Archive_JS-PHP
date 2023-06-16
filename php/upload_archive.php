<?php
   
    $file_name = $_FILES['file']['name']; //getting file name
    $tmp_name = $_FILES['file']['tmp_name'];//getting temp_name
    $file_up_name = time() . $file_name;//file name more dynamic adding time before file name
    move_uploaded_file($tmp_name, 'files_uploaded/' . $file_up_name);// move file to specific folder.

?>