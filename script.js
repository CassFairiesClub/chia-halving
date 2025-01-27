const halving1 = 5045760;
const halving2 = 10091520;
const halving3 = 15137280;
const halving4 = 20183040;
document.body.style.backgroundColor = "black";
document.body.style.backgroundImage = "url('https://bafybeiba6keoz3ondbqw73e6ujbyrryke3omkdj6ujtdlidtqprxxmglpu.ipfs.nftstorage.link/steel.png')";
document.body.style.backgroundRepeat = "no-repeat";
document.body.style.backgroundSize = "contain";
document.body.style.backgroundPosition = "center center";
document.body.style.color = "silver";
var block = 0;
var blocksleft = 0;
var perc;
var time;
var seconds;
var sec;
var indice;
var reste;
var text2;
var x;
var future;
const delay = ms => new Promise(res => setTimeout(res, ms));

function getValue() {
    var value = $.ajax({
        url: 'https://api.coinset.org/get_blockchain_state',
        //url: 'https://kraken.fireacademy.io/a16e7e79-d1f8-43a6-b79f-89846ffbbfa3/leaflet/get_blockchain_state',
        type: 'post',
        contentType: 'application/json',
        async: false
    }).responseText;
    return value;
}

function checkBlock() {
    clearInterval(x);
    if (block < halving1) {
        blocksleft = halving1 - block;
        time = blocksleft * 18.75
    }
    if (block < halving2 && block >= halving1) {
        blocksleft = halving2 - block;
        time = blocksleft * 18.75
        document.body.style.backgroundImage = "url('https://bafybeiba6keoz3ondbqw73e6ujbyrryke3omkdj6ujtdlidtqprxxmglpu.ipfs.nftstorage.link/jade.png')";
        document.body.style.color = "mediumspringgreen";
    }
    if (block < halving3 && block >= halving2) {
        blocksleft = halving3 - block;
        time = blocksleft * 18.75
        document.body.style.backgroundImage = "url('https://bafybeiba6keoz3ondbqw73e6ujbyrryke3omkdj6ujtdlidtqprxxmglpu.ipfs.nftstorage.link/amethyst.png')";
        document.body.style.color = "mediumpurple";
    }
    if (block < halving4 && block >= halving3) {
        blocksleft = halving4 - block;
        time = blocksleft * 18.75
        document.body.style.backgroundImage = "url('https://bafybeiba6keoz3ondbqw73e6ujbyrryke3omkdj6ujtdlidtqprxxmglpu.ipfs.nftstorage.link/gold.png')";
        document.body.style.color = "gold";
    }
    if (block >= halving4) {
        blocksleft = 0;
        time = blocksleft * 18.75
        document.body.style.backgroundImage = "url('https://bafybeiba6keoz3ondbqw73e6ujbyrryke3omkdj6ujtdlidtqprxxmglpu.ipfs.nftstorage.link/timelord.png')";
    }
    if (block == halving1 || block == halving2 || block == halving3 || block == halving4) {
        document.body.style.backgroundImage = "url('https://bafybeifjwxdw6qi32xtj23zv2dw57c6eqfylsvr5tjwuiqm244s7owfq6i.ipfs.nftstorage.link/278.gif')";
        const yourFunction = async () => {
            await delay(15000);
            console.log("Waited 5s");
        };
        // location.reload();
        time = halving1 * 18.75
    }
    seconds = parseInt(time, 10);
    sec = seconds;
    perc = 100 - (blocksleft % halving1) * 100 / halving1;
    indice = 1;
    reste = 1;
    future = new Date((Math.floor(Date.now() / 1000) + seconds) * 1000);

    x = setInterval(function () {
        var days = Math.floor(sec / (3600 * 24));
        sec -= days * 3600 * 24;
        var hrs = Math.floor(sec / 3600);
        sec -= hrs * 3600;
        var mnts = Math.floor(sec / 60);
        sec -= mnts * 60;
        timetring = `${days}d${hrs}h${mnts}m${sec}s`
        text2 = `${future.toUTCString()} ${new Intl.NumberFormat().format(blocksleft)} ${perc.toString().substring(0, 5)}% ${timetring}`
        if (block >= halving4) {
            text2 = ``
        }
        $(".mypanel").html(text2);
        indice++;
        sec = seconds - indice;
        reste = indice % 19;
        if (reste == 0) {
            block++;
        }
    }, 1000);
}

const ws = new WebSocket('wss://api.coinset.org/ws');
ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    switch (message.type) {
        case 'peak':
            console.log('New block height:', message.data.height);
            block = message.data.height;
            checkBlock();
            document.getElementById("sig").style.textShadow = "0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #b6ff00, 0 0 70px #b6ff00, 0 0 80px #b6ff00, 0 0 100px #b6ff00, 0 0 150px #b6ff00";
            setTimeout(() => {
                document.getElementById("sig").style.textShadow = "none";
              }, 100);
              
            break;
    }
};

const json = getValue();
const obj = JSON.parse(json);
block = obj.blockchain_state.peak.height;

checkBlock();
if(document.body.clientHeight < document.body.clientWidth){
    document.getElementById("mypanel").style.width = document.body.clientHeight
}
