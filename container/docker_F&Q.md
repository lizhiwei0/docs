# Docker

## network

*   After I setup my iptables on my vm/computer, I found when I start a docker container, I always fail and got following log:

    <span class="hljs-label">
    COMMAND_FAILED:</span> <span class="hljs-string">'/sbin/iptables -t nat -A DOCKER -p tcp -d 0/0 --dport 8111 -j DNAT --to-destination 172.17.0.6:8111 ! -i docker0'</span> <span class="hljs-string">failed:</span> <span class="hljs-string">iptables:</span> No chain<span class="hljs-regexp">/target/</span>match by that name.
    `
    `</pre>

*   cause of this issue is that the network was update
    a simple solution for this issue is reset tht network for docker
    <pre>`<span class="hljs-title">pkill</span> docker
    iptables -t nat -F
    ifconfig docker0 down
    brctl delbr docker0
    systemctl restart docker