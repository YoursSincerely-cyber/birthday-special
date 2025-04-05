$(document).ready(function() {
    $("#present").addClass("animated bounceInDown");

    $("#present").hover(function() {
        $("#present #top").addClass("animated bounce");
    }, function() {
        $("#present #top").removeClass("animated bounce");
    });

    $("#present").on("click", function() {
        $("#present #top").removeClass("animated bounce");
        $("#present #top").addClass("animated bounceOutUp");

        // Unbind actions to prevent double-click
        $(this).unbind("click");
        $(this).unbind("mouseleave");

        // 🎉 Confetti blast as soon as the box opens
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });

        // 🎶 Play birthday music
        var birthdaySong = document.getElementById("birthdaySong");
        birthdaySong.play();  // Start playing the song

        // Delay for cat + text reveal
        setTimeout(function() {
            $("#present #cat").css("top", "-160px");

            // 🎉 Second confetti blast when the cat pops out
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.4 }
            });

            // Animate each letter
            $("#wish").children("div").each(function(index) {
                setTimeout(bounceIn.bind(null, $(this)), index * 100);
            });

            // Show birthday message after letters animation finishes
            setTimeout(() => {
                $("#birthdayMessage").css("display", "flex");
                startConfettiRain(); // Start looping confetti rain
                startBalloons(); // Start balloon animation
            }, 2500 + $("#wish").children("div").length * 100);

        }, 1000);
    });

    // Bounce-in effect for each letter in the wish
    function bounceIn(el) {
        el.addClass("animated bounceInDown swing");
        setTimeout(function() {
            el.removeClass("bounceInDown").addClass("swing");
        }, 1000);
    }

    // Hide birthday message when user clicks anywhere
    $(document).on("click", function() {
        if ($("#birthdayMessage").is(":visible")) {
            $("#birthdayMessage").fadeOut(500);
        }
    });

    // 🎉 Looping confetti rain
    function startConfettiRain() {
        setInterval(() => {
            confetti({
                particleCount: 10,
                angle: 90,
                spread: 80,
                origin: {
                    x: Math.random(), // random x position
                    y: 0
                },
                colors: ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd']
            });
        }, 300); // confetti burst every 300ms
    }

    // 🎇 Generate sparkles
    function generateSparkles(count = 50) {
        const colors = ['#ffb6c1', '#fff0f5']; 

        for (let i = 0; i < count; i++) {
            const sparkle = $('<div class="sparkle"></div>');
            const size = Math.random() * 8 + 6;
            sparkle.css({
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                width: size + 'px',
                height: size + 'px',
                background: colors[Math.floor(Math.random() * colors.length)],
                animationDelay: (Math.random() * 5) + 's'
            });
            $('#sparkleContainer').append(sparkle);
        }
    }
    generateSparkles(60); // 🎇 Create sparkles

    // 🎈 Balloon animation
    function startBalloons() {
        // Show balloons in the background gently swaying
        const balloonCount = 5;
        for (let i = 0; i < balloonCount; i++) {
            const balloon = $('<div class="balloon"></div>');
            balloon.css({
                left: Math.random() * 100 + '%', // Randomize the left position
                bottom: '-100px', // Start below the screen
                opacity: 1,
                animation: `swayBalloon 5s ease-in-out infinite`
            });
            $('#balloonsContainer').append(balloon);
        }

        // Balloon sway animation (CSS)
        const balloonStyle = `
        @keyframes swayBalloon {
            0% { transform: translateY(0); }
            50% { transform: translateY(-200px); }
            100% { transform: translateY(0); }
        }`;
        $('<style>').prop('type', 'text/css').html(balloonStyle).appendTo('head');
    }

    document.addEventListener('DOMContentLoaded', function() {
        // Prevent touch scrolling on mobile devices
        document.body.addEventListener('touchmove', function(e) {
          e.preventDefault();
        }, { passive: false });
        
        // Prevent wheel/scroll events
        window.addEventListener('wheel', function(e) {
          e.preventDefault();
        }, { passive: false });
      });
});
