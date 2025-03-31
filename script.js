document.addEventListener("DOMContentLoaded", function() {
    const cong = document.getElementById("cong");
    cong.style.display = "none";

    const com = document.getElementById("com");
    com.style.display = "none";
    let comX = com.offsetLeft;
    let comY = com.offsetTop;

    const mc = document.getElementById("mc");
    let mcX = mc.offsetLeft;
    let mcY = mc.offsetTop;

    const el = document.getElementById("cirS");
    let center = 200 - 5;
    let radius = 100;
    let dg = 1;

    function calculateCirclePosition(degree) {
        return {
            x: center + (Math.cos(degree * Math.PI / 180) * radius),
            y: center + (Math.sin(degree * Math.PI / 180) * radius)
        };
    }

    function calculateDistance(x1, y1, x2, y2) {
        return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
    }

    function updateCirclePosition() {
        const positions = {
            subMx: calculateCirclePosition(dg - 32 / Math.PI),
            subHf: calculateCirclePosition(dg - 16 / Math.PI),
            original: calculateCirclePosition(dg),
            addHf: calculateCirclePosition(dg + 16 / Math.PI),
            addMx: calculateCirclePosition(dg + 32 / Math.PI)
        };

        const distances = {
            dist1: calculateDistance(positions.subMx.x, positions.subMx.y, mcX, mcY),
            dist2: calculateDistance(positions.subHf.x, positions.subHf.y, mcX, mcY),
            dist3: calculateDistance(positions.original.x, positions.original.y, mcX, mcY),
            dist4: calculateDistance(positions.addHf.x, positions.addHf.y, mcX, mcY),
            dist5: calculateDistance(positions.addMx.x, positions.addMx.y, mcX, mcY)
        };

        if (distances.dist1 < distances.dist2 && distances.dist1 < distances.dist3 && distances.dist1 < distances.dist4 && distances.dist1 < distances.dist5) {
            dg -= 32 / Math.PI;
        } else if (distances.dist2 < distances.dist1 && distances.dist2 < distances.dist3 && distances.dist2 < distances.dist4 && distances.dist2 < distances.dist5) {
            dg -= 16 / Math.PI;
        } else if (distances.dist3 < distances.dist1 && distances.dist3 < distances.dist2 && distances.dist3 < distances.dist4 && distances.dist3 < distances.dist5) {
            dg += 0 / Math.PI;
        } else if (distances.dist4 < distances.dist1 && distances.dist4 < distances.dist2 && distances.dist4 < distances.dist3 && distances.dist4 < distances.dist5) {
            dg += 16 / Math.PI;
        } else if (distances.dist5 < distances.dist1 && distances.dist5 < distances.dist2 && distances.dist5 < distances.dist3 && distances.dist5 < distances.dist4) {
            dg += 32 / Math.PI;
        }

        const newPosition = calculateCirclePosition(dg);
        el.style.left = newPosition.x + "px";
        el.style.top = newPosition.y + "px";
    }

    document.getElementById("ctr").addEventListener("keydown", function (event) {
        mcX = mc.offsetLeft;
        mcY = mc.offsetTop;

        if (event.which === 39) {
            mc.style.left = (mcX + 5) + "px";
        } else if (event.which === 37 && mcX >= 0) {
            mc.style.left = (mcX - 5) + "px";
        } else if (event.which === 40) {
            mc.style.top = (mcY + 5) + "px";
        } else if (event.which === 38) {
            mc.style.top = (mcY - 5) + "px";
        }

        updateCirclePosition();

        if (mcX + 10 - 5 > parseFloat(el.style.left) && mcX < parseFloat(el.style.left) + 10 - 5 && mcY + 10 - 5 > parseFloat(el.style.top) && mcY < parseFloat(el.style.top) + 10 - 5) {
            mc.style.display = "none";
            com.style.left = mcX + "px";
            com.style.top = (mcY - 60) + "px";
            com.style.display = "block";
        }

        if (mcX < 90 && mcX > 30 && mcY < 70 && mcY > 20) {
            cong.style.display = "block";
        }
    });

    document.getElementById("chg").addEventListener("click", function () {
        if (parseFloat(el.style.top) === 195) {
            this.style.backgroundColor = "green";
        }
    });
});
