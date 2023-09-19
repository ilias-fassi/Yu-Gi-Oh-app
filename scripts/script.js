// LP MANAGEMENT
    var p1_current_LP=8000;
        var p2_current_LP=8000;
        //reset les LP
        function reset() {
            p1_current_LP=8000;
            p2_current_LP=8000;
            document.getElementById("p1_LP").innerHTML=8000;
            document.getElementById("p2_LP").innerHTML=8000;
            document.getElementById("logs_player_one").innerHTML+=p1_current_LP +"<br>";
            document.getElementById("logs_player_two").innerHTML+=p2_current_LP +"<br>";
        }
        // if LP < 0, then LP = 0
        function zero () {
            if (p1_current_LP <= 0) p1_current_LP=0;
            if (p2_current_LP <= 0) p2_current_LP=0;
        }
        // Augmente les LP du joueur 1 de amount.
        function p1_gain(amount){
            if (amount=="1000"){p1_current_LP+=1000;}
            else if (amount=="500"){p1_current_LP+=500;}
            else if (amount=="100"){p1_current_LP+=100;}
            else if (amount=="50"){p1_current_LP+=50;}
            else if (amount=="-1000"){p1_current_LP-=1000;}
            else if (amount=="-500"){p1_current_LP-=500;}
            else if (amount=="-100"){p1_current_LP-=100;}
            else if (amount=="-50"){p1_current_LP-=50;}
            zero ();
            document.getElementById("p1_LP").innerHTML=p1_current_LP;
            document.getElementById("logs_player_one").innerHTML+=p1_current_LP +"<br>";
        }
        // Augmente les LP du joueur 2 de amount.
        function p2_gain(amount){
            if (amount=="1000"){p2_current_LP+=1000;}
            else if (amount=="500"){p2_current_LP+=500;}
            else if (amount=="100"){p2_current_LP+=100;}
            else if (amount=="50"){p2_current_LP+=50;}
            else if (amount=="-1000"){p2_current_LP-=1000;}
            else if (amount=="-500"){p2_current_LP-=500;}
            else if (amount=="-600"){p2_current_LP-=600;}
            else if (amount=="-100"){p2_current_LP-=100;}
            else if (amount=="-50"){p2_current_LP-=50;}
            zero ();
            document.getElementById("p2_LP").innerHTML=p2_current_LP;
            document.getElementById("logs_player_two").innerHTML+=p2_current_LP +"<br>";
        }
        // Divise par deux les LP du joueur 1.
        function p1_half(){
            p1_current_LP=p1_current_LP/2;
            document.getElementById("p1_LP").innerHTML=p1_current_LP;
            document.getElementById("logs_player_one").innerHTML+=p1_current_LP +"<br>";
        }
        // Divise par deux les LP du joueur 2.
        function p2_half(){
            p2_current_LP=p2_current_LP/2;
            document.getElementById("p2_LP").innerHTML=p2_current_LP;
            document.getElementById("logs_player_two").innerHTML+=p2_current_LP +"<br>";
        }


// LOGS MANAGEMENT
    function clear_logs (){
        document.getElementById("logs_player_one").innerHTML="";
        document.getElementById("logs_player_two").innerHTML="";
    }

// DICE ROLL
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); 
        // renvoie x € [min;max[
    }
    function dice_roll () {
        document.getElementById('dice_roll_res').innerText = getRandomInt(1,7)+" & "+getRandomInt(1,7);
        return 0;
    }

// COIN TOSS
    function coin_toss () {
        res = getRandomInt(0,2);
        if (res == 0) document.getElementById('coin_toss_res').innerText = "HEAD";
        if (res == 1) document.getElementById('coin_toss_res').innerText = "TAIL";
        return 0;
    }

// PROBABILITY CALCULATOR
function fact (n){
    if (n==1 || n==0) return 1;
    return n*fact(n-1);
}
function comb (k, n){
    return fact(n)/(fact(k)*fact(n-k));
}
function proba_c1 () {
    return comb(1,3)*comb(4,37)/comb(5,40);
}

function proba (D,H,Amt,Qty) {
    return 100*comb(Qty,Amt)*comb(H-Qty,D-Amt)/comb(H,D);
}
function proba_min_max (D,H,Amt,Min,Max) {
    if (Min > Amt) {
        alert('Erreur : Min > Quantity/deck !');
        return 0;
    }
    if (Min > H) {
        alert('Erreur : Min > Hand size !');
        return 0;
    }
    if (Min > Max){
        alert('Erreur : Min > Max');
        return 0;
    }
    if (Min < Max) {
        res = 0;
        maxx = Max;
        maxx ++;
        for (k = Min ; k < maxx; k++){
            res += proba(D,H,Amt,k);
            // alert("after : k="+k+",res="+res);
        }
        // alert('sortie de boucle');
        return res;
    }
    return proba(D,H,Amt,Min);
}
function aux (){
    D = document.getElementById("D").value;
    H = document.getElementById("H").value;
    Amt = document.getElementById("Amt").value;
    Min = document.getElementById("Min").value;
    Max = document.getElementById("Max").value;
    document.getElementById("res").innerHTML=proba_min_max(D,H,Amt,Min,Max).toFixed(2)+"%";
}