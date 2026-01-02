function validerEmail() {
    const email = document.getElementById('emailInput').value;
    const resultat = document.getElementById('resultatEmail');

    const atPos = email.indexOf('@');
    const dotPos = email.lastIndexOf('.');

    if (atPos > 0 && dotPos > atPos + 1 && dotPos < email.length - 1) {
        resultat.innerHTML = "✅ Email valide";
        resultat.style.color = "green";
    } else {
        resultat.innerHTML = "❌ Email invalide (ex: nom@domaine.com)";
        resultat.style.color = "red";
    }
}

function trier(liste) {
    return liste.sort((a, b) => a - b);
}

function afficherTri() {
    const maListe = [45, 2, 89, 12, 7];
    const listeTriee = trier(maListe);
    document.getElementById('resultatTri').innerHTML =
        "Liste triée : " + listeTriee.join(' - ');
}

function calculerSommeTemps() {
    const h1 = parseInt(document.getElementById('h1').value) || 0;
    const m1 = parseInt(document.getElementById('m1').value) || 0;
    const s1 = parseInt(document.getElementById('s1').value) || 0;

    const h2 = parseInt(document.getElementById('h2').value) || 0;
    const m2 = parseInt(document.getElementById('m2').value) || 0;
    const s2 = parseInt(document.getElementById('s2').value) || 0;

    const h3 = parseInt(document.getElementById('h3').value) || 0;
    const m3 = parseInt(document.getElementById('m3').value) || 0;
    const s3 = parseInt(document.getElementById('s3').value) || 0;

    let totalSecondes =
        (h1 + h2 + h3) * 3600 +
        (m1 + m2 + m3) * 60 +
        (s1 + s2 + s3);

    const jours = Math.floor(totalSecondes / 86400);
    totalSecondes %= 86400;

    const heures = Math.floor(totalSecondes / 3600);
    totalSecondes %= 3600;

    const minutes = Math.floor(totalSecondes / 60);
    const secondes = totalSecondes % 60;

    document.getElementById('resJ').value = jours;
    document.getElementById('resH').value = heures;
    document.getElementById('resM').value = minutes;
    document.getElementById('resS').value = secondes;
}

function effacerChamps() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = input.readOnly ? "" : "0";
    });
    document.getElementById('emailInput').value = "";
}
