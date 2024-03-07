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
    const delay = ms => new Promise(res => setTimeout(res, ms));

    function getValue() {
      var value = $.ajax({
        url: 'https://kraken.fireacademy.io/a16e7e79-d1f8-43a6-b79f-89846ffbbfa3/leaflet/get_blockchain_state',
        async: false
      }).responseText;
      return value;
    }
    const json = getValue();
    const obj = JSON.parse(json);
    block = obj.blockchain_state.peak.height;
    console.log(block)

    function checkBlock() {
      if (block < halving1) {
        blocksleft = halving1 - block;
      }
      if (block < halving2 && block >= halving1) {
        blocksleft = halving2 - block;
        document.body.style.backgroundImage = "url('https://bafybeiba6keoz3ondbqw73e6ujbyrryke3omkdj6ujtdlidtqprxxmglpu.ipfs.nftstorage.link/jade.png')";
        document.body.style.color = "mediumspringgreen";
      }
      if (block < halving3 && block >= halving2) {
        blocksleft = halving3 - block;
        document.body.style.backgroundImage = "url('https://bafybeiba6keoz3ondbqw73e6ujbyrryke3omkdj6ujtdlidtqprxxmglpu.ipfs.nftstorage.link/amethyst.png')";
        document.body.style.color = "mediumpurple";
      }
      if (block < halving4 && block >= halving3) {
        blocksleft = halving4 - block;
        document.body.style.backgroundImage = "url('https://bafybeiba6keoz3ondbqw73e6ujbyrryke3omkdj6ujtdlidtqprxxmglpu.ipfs.nftstorage.link/gold.png')";
        document.body.style.color = "gold";
      }
      if (block >= halving4) {
        blocksleft = 0;
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
        seconds = parseInt(time, 10);
        sec = seconds;
      }
      perc = 100 - (blocksleft % halving1) * 100 / halving1;
    }
    // block = 5045759;
    checkBlock();
    time = blocksleft * 18.75
    seconds = parseInt(time, 10);
    sec = seconds;
    indice = 1;
    reste = 1;
    var x = setInterval(function() {
      checkBlock();
      var days = Math.floor(sec / (3600 * 24));
      sec -= days * 3600 * 24;
      var hrs = Math.floor(sec / 3600);
      sec -= hrs * 3600;
      var mnts = Math.floor(sec / 60);
      sec -= mnts * 60;
      timetring = `${days}d${hrs}h${mnts}m${sec}s`
      text2 = `${new Intl.NumberFormat().format(blocksleft)} ${perc.toString().substring(0,5)}% ${timetring}`
      if (block >= halving4) {
        text2 = ``
      }
      $(".mypanel").html(text2);
      indice++;
      sec = seconds - indice;
      reste = indice % 19;
      if (reste == 0) {
        //blocksleft--;
        block++;
      }
      // console.log(seconds);
    }, 1000);
    // });
