./ngrok authtoken <token> > /dev/null 2>&1 & 
php -S localhost:9991 > /dev/null 2>&1 & ./ngrok http 9991> /dev/null 2>&1 & 
echo "Press [CTRL+C] to stop.."
ctrlc_count=0
function no_ctrlc()
{
    echo;
    echo "Okay, BYE!!"
    pkill -f ngrok
    pkill -f php
    exit
}
trap no_ctrlc SIGINT
while true
do
    sleep 10
done
