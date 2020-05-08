$(document).ready(function(){
    var i;
    var quiz=[];
    var Count;
    var imageChoice;
    var correct=0;
    var missed =0;
    var attempted = 0;
    var rightAns;
    var intervalTimer;
    var delayButtonAlert;
    var newQuest;
    var ansAttempt;
    var sayac = correct + missed;

    temizle();
    quizBuild();

    i = 1;

    hideStuff();

    $("#new-question").on("click",displayNewQuestion);
    $("#new-question").on("click",displayStats);
    $("#new-question").on("click",imageInsert);

function temizle() {
    document.getElementById("deneme").style.visibility = "hidden";
}
    function displayNewQuestion(){

        document.getElementById("deneme").style.visibility = "visible";

        if (i > 0) {
            clearTimeout(newQuest);
        }

        $("#new-question").hide();
        videoInsert()
        imageInsert();
        hideStuff();


        ansAttempt = false;
        quizWrite();

        Count = 30;
        intervalTimer = setInterval(countDown,1000)

        delayButtonAlert = setTimeout(notAttempted,30000)
        clearButton();


    }


    $(document).on("click",".answer",Attempted);


    // Sayaç bu fonksiyon aracılığı ile azalır.
    function countDown(){
        Count -= 1;
        $("#seconds-count").html('<h3> '+ Count + " saniyen kaldı </h3> ")
        return Count;
    }

    function hideStuff(){

        //$(".stats").hide();
        $("#message").hide();
        $("#picture").hide();
        $("#Reveal").hide();
    }


    //Cevapların doğru veya yanlış olduğunu kontrol eder.
    function Attempted(){

        clearTimeout(delayButtonAlert);
        clearTimeout(intervalTimer);


        ansAttempt = true;
        $("#message").show();

        userChoice = parseInt($(this).val());
        console.log(userChoice, i);

        attempted += 1;

        if (userChoice == quiz[i].ans){

            $("#message").html('Doğru Cevap verdin!');
            correct += 1;
        }
        else {
            $("#message").html('Yanlış Cevap verdin !');
            missed += 1;
        }

        $(".stats").show();
        displayStats();

        displayAnsImg();
    }

    //Eğer belirtilen sürede cevap verilmemiş ise süre sonunda yanlış olarak sayılır yeni soruya geçer.
    function notAttempted(){

        if (ansAttempt != true){

            clearTimeout(delayButtonAlert);
            clearTimeout(intervalTimer);

            missed +=1;

            $(".stats").show();
            displayStats();

            displayAnsImg();
        }
        else {
            return
        }
    }

    //Bir soruya cevap verildikten 2 saniye sonra yeni soruyu ekrana bastırır.
    function displayAnsImg(){

        if (i < quiz.length){

            newQuest = setTimeout(displayNewQuestion,2000);
            $("video").remove();

        }

        imageChoice = imageInsert();
        $("#picture").html(imageChoice);
        $("#Reveal").html("Doğru Cevap: " + quizAnswer());

        $("#picture").show();
        $("#Reveal").show();

        i++;
    }

    //Sorular için basit bir constructor
    function quizConstructor(question,choice1,choice2,choice3,choice4,ans,imageURL,attempted, videoURL){
        this.question = question;
        this.choice1   = choice1;
        this.choice2   = choice2;
        this.choice3   = choice3;
        this.choice4   = choice4;
        this.ans       = ans;
        this.imageURL  = imageURL;
        this.attempted = attempted;
        this.videoURL  = videoURL;
    }

    //Sorular, seçenekleri, cevapları, resimleri, videoları hepsi burada dizi aracılığı ile tanımlanır.
    function quizBuild(){
        quiz[1] = new quizConstructor('Belgrad’da gerçekleşen 2016 CS: GO Turnuvasında Hangi Ülke Şampiyon Olmuştur ','Türkiye','Arjantin','Almanya','Fransa',1,"files/cs_go.jpg",false);
        quiz[2] = new quizConstructor('Videoda çalan klibin ismi nedir','Strongest','Thumbs','FRIENDS','In Your Eyes',3,"",false,"files/video1.mp4");
        quiz[3] = new quizConstructor('Yanda yer alan görüntüdeki mimari yapı hangisidir ','Şifaiye Medresesi','Gök Medrese','Buruciye Medresesi','Sivas Ulu Cami',2,"files/q0.jpg",false);
        quiz[4] = new quizConstructor('Videoda bağlama ile çalınan eser hangisidir ','Güzelliğin On Para Etmez','Gesi Bağları','Çırpınıp İçinde Döndüğüm  Deniz','Kul Olayım Kalem Tutan Ellere',4,"",false,"files/q1.mp4");
        quiz[5] = new quizConstructor();
        return quiz
    }

    //Her cevap verilen soru sonunda buton renkleri default hale döndürülür.
    function clearButton(){
        $("#option-1").css("background-color","bisque");
        $("#option-2").css("background-color","bisque");
        $("#option-3").css("background-color","bisque");
        $("#option-4").css("background-color","bisque");
    }

    //soruları ekrana basar.
    function quizWrite(){
        $("#question").html("" + quiz[i].question + " ?");

        console.log(quiz[i].videoURL);
        if(quiz[i].videoURL==null){
            imageChoice = imageInsert();
            $("#picture").show();
            $("#picture").html(imageChoice);
        }
        else{
            imageChoice = videoInsert();
            $("#video").show();
            $("#video").html(imageChoice);
        }

    // dizinin 6. elemanında soru olmadığı için 5. indise geldiğinde ekran temizlenir ve oyun durur.
        if(i==5)
        {
            var x = document.getElementById("deneme");
            if (x.style.display === "none") {
                x.style.display = "block";
            } else {
                x.style.display = "none";
            }

            var x = document.getElementById("seconds-count");
            if (x.style.display === "none") {
                x.style.display = "block";
            } else {
                x.style.display = "none";
            }
            alert("Oyun Bitti!\n"+"Doğru Sayısı: "+correct+"\nYanlış Sayısı: "+missed);

        }
        $("#option-1").html(quiz[i].choice1);
        $("#option-2").html(quiz[i].choice2);
        $("#option-3").html(quiz[i].choice3);
        $("#option-4").html(quiz[i].choice4);

    }

    //cevap kısmında value değerleri ile seçim eşleşmeleri
    function quizAnswer(){
        if (quiz[i].ans == 1){
            quizAns = quiz[i].choice1;
        }else if (quiz[i].ans == 2){
            quizAns = quiz[i].choice2;
        }else if (quiz[i].ans == 3){
            quizAns = quiz[i].choice3;
        }if (quiz[i].ans == 4){
            quizAns = quiz[i].choice4;
        }

        // Eğer cevap 1. seçenek ise onu yeşil yap gerisini kırmızı yap
        if(1==quiz[i].ans){
            $("#option-1").css("background-color","green");
            $("#option-2").css("background-color","red");
            $("#option-3").css("background-color","red");
            $("#option-4").css("background-color","red");
        }

        // Eğer cevap 2. seçenek ise onu yeşil yap gerisini kırmızı yap

        if(2==quiz[i].ans){
            $("#option-1").css("background-color","red");
            $("#option-2").css("background-color","green");
            $("#option-3").css("background-color","red");
            $("#option-4").css("background-color","red");
        }

        // Eğer cevap 3. seçenek ise onu yeşil yap gerisini kırmızı yap
        if(3==quiz[i].ans){
            $("#option-1").css("background-color","red");
            $("#option-2").css("background-color","red");
            $("#option-3").css("background-color","green");
            $("#option-4").css("background-color","red");
        }

        // Eğer cevap 4. seçenek ise onu yeşil yap gerisini kırmızı yap
        if(4==quiz[i].ans){
            $("#option-1").css("background-color","red");
            $("#option-2").css("background-color","red");
            $("#option-3").css("background-color","red");
            $("#option-4").css("background-color","green");
        }

        return quizAns;
    }

    //Ekrana Doğru sayısını, yanlış sayısını ve deneme sayısını yazdır.
    function displayStats(){
        $(".stats").html("<h4> Doğru Sayısı: "+correct+'<br>'+"Yanlış Sayısı: " + missed + '<br>' +"Deneme Sayısı: " +attempted+ '</h4>');
    }

    //Resim ekleme fonksiyonu
    function imageInsert(){
        var imageChoice = $('<img>');
        imageChoice.attr('src', quiz[i].imageURL);
        imageChoice.attr('width','800px');
        return imageChoice;
    }

    //Video ekleme fonksiyonu
    function videoInsert(){
        var imageChoice = $('<video>');
        imageChoice.attr("controls","controls");
        imageChoice.html('<source src='+ quiz[i].videoURL +' type=\'video/mp4\'>');
        imageChoice.attr('width','800px');
        return imageChoice;
    }
})