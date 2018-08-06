#shell commands

##awk

ps aux|grep chrome > ~/clean/chrome.txt
awk '$3 == 0.0 {print $2}' ~/clean/chrome.txt > ~/clean/idle-chrome.txt
LOG_TIME=`date`
echo 'cleaning idle chrome process at' $LOG_TIME > ~/clean/clear.log
cat '~/clean/idle-chrome.txt' | while read LINE
do
echo 'Killing ' $LINE >> ~/clean/clear.log
kill -9 $LINE
done

echo 'done clear idle chrome process' >> ~/clean/clear.log

