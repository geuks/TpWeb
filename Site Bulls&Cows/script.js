/* ***************************BUT****PRINCIPAL***************************************
  *
   *_CREATEUR:UNALAN Gökhan
   *
   *______BUT:Jeu de Bull & Cows
   *           L'utilisateur entre un mot (chaine) et doit trouver le mot caché.
   *           Bulls=Code correct et à la bonne position.
   *           Cows=Code correct mais à la mauvaise position.
   *
   *___ENTREE:L'utilisateur entre un mot (chaine).
   * 
   *___SORTIE:Une fois le nombre de faute atteint ou que l'utilisateur trouve le mot,
   *           il gagne ou perd la partie, il peut recommencer ou quitter.
  *
************************************************************************************/



var nbrRand="";		//Le nombre random à trouver
var nbrJoueur="";		//Le nombre que le joueur entre
var bulls=0;		//Nombre de bulls
var cows=0;		//Nombre de cows
var cpt=1;		//compteur nbr d'erreur
var tempsJeu;		//variable pour le temps de jeu


/* *************************PROCEDURE*** / ***FONCTION******************************
	 *_____BUT: Generer un nombre random à l'initialisation du body
	 *__ENTREE:1 string en global, 2 string en local, 2 en entier
	 *__SORTIE:nombre aleatoire generer, et affiche le temps
***********************************************************************************/
function main(){
	var test1=true;
	do{
		test1=true;
		nbrRand="";
		
		//genere le random
		for(i=1; i<=4; i++) {
			nbrRand+=Math.floor((Math.random() * 10))
		}
		
		//test si le nombre est jamais le meme
		for(i=0;i<=3;i++){
			for(j=0;j<=3;j++){
				if((i!=j) && (nbrRand[i]==nbrRand[j])){
					test1=false;
				}
			}
		}
	} while(test1==false);
	showTime();	//affiche l'heure
}
//********************FIN***PROCEDURE***//***FONCTION*****************************


/* *************************PROCEDURE*** / ***FONCTION******************************
	 *_____BUT: affiche le temps en seconde
	 *__ENTREE: 3 chaine
	 *__SORTIE: temps afficher en secondes
***********************************************************************************/
function showTime(){
	var heures = document.getElementById('heures').innerHTML * 1;
	var minutes = document.getElementById('minutes').innerHTML * 1;
	var secondes = document.getElementById('secondes').innerHTML * 1;
	
	secondes = secondes+1;
	
	if (secondes == 60) {
		minutes += 1;
		secondes = 0;
	}
	
	if (minutes == 60) {
		heures += 1;
		minutes = 0;
	}
	
	if (secondes<10) secondes = '0'+secondes;
	if (minutes<10) minutes = '0'+minutes;
	if (heures<10) heures = '0'+heures;
	
	secondes=secondes+'';
	minutes=minutes+'';
	heures=heures+'';
	
	document.getElementById('heures').innerHTML=heures;
	document.getElementById('minutes').innerHTML=minutes;
	document.getElementById('secondes').innerHTML=secondes;
	tempsJeu = setTimeout('showTime()', 1000);
}
//********************FIN***PROCEDURE***//***FONCTION*****************************



/* *************************PROCEDURE*** / ***FONCTION******************************
	 *_____BUT: compte le nombre de bulls
	 *__ENTREE: 2 entier en global, et 1 entier en local
	 *__SORTIE:nombre de bulls
***********************************************************************************/
function nbrBulls(){
	var i;
  for(i=0; i<=nbrRand.length;i++){
    if (nbrJoueur[i]==nbrRand[i])
      bulls+=1;
	}
}
//********************FIN***PROCEDURE***//***FONCTION*****************************



/* *************************PROCEDURE*** / ***FONCTION******************************
	 *_____BUT: compte le nombre de cows
	 *__ENTREE: 2 chaine en global et 2 entier en local
	 *__SORTIE: nombre de cows
***********************************************************************************/
function nbrCows(){
	var i,j;
	for(i=0;i<=nbrRand.length;i++){
    for(j=0;j<=nbrRand.length;j++){
      if((nbrJoueur[i]==nbrRand[j]) && (i!=j))
        cows+=1;
		}
	}
}
//********************FIN***PROCEDURE***//***FONCTION*****************************



/* *************************PROCEDURE*** / ***FONCTION******************************
	 *_____BUT: verifie si l'utilisateur à rentré le bon ou le mauvais numero
	 *__ENTREE: 2 chaine, 3 entier en global, 1 entier en local
	 *__SORTIE:si le joueur à trouver ou non le nombre
***********************************************************************************/
function Check(){
	var i;
	nbrJoueur="";
	
	//récupere les données entrée de l'utilisateur
	for(i=1; i<=4; i++) {
		if(document.getElementById("nbr"+i.toString()).value!=""){
			nbrJoueur+=document.getElementById("nbr"+i.toString()).value;
			document.getElementById("nbr"+i.toString()).value="";
		}
	}
	
	//si les données sont correct
	if(nbrJoueur.length==4){
		bulls=0;
		cows=0;
		
		//calcul nbr de bulls
		nbrBulls();
		//calcul nbr de cows
		nbrCows();
		
		document.getElementById("essai_"+cpt.toString()).value=nbrJoueur;
		document.getElementById("bull_"+cpt.toString()).value=bulls;
		document.getElementById("cows_"+cpt.toString()).value=cows;
		cpt+=1;
		
		//Si cpt = nombre d'érreur = 8 alors fin du jeu
		if(cpt==8) 
		{
				alert("Le numero a trouver etait "+nbrRand);
				document.getElementById("resultat").value=nbrRand;
				clearTimeout(tempsJeu); 
		}
		else	//Sinon si le nbr de bull correspond a la longueur du nombre à trouver
			if(bulls==nbrRand.length)
			{
				alert("Bravo ! Le numero est bien "+nbrRand);
				document.getElementById("resultat").value=nbrRand;
				clearTimeout(tempsJeu); 
			}
	}
	else
		alert("Entrez tout les nombres svp");
	
}
//********************FIN***PROCEDURE***//***FONCTION*****************************


/* *************************PROCEDURE*** / ***FONCTION******************************
	 *_____BUT: test si l'utilisateur n'a pas écrit le meme nombre
	 *__ENTREE: 3 entier en local, 1 entier en parametre
	 *__SORTIE: booleen
***********************************************************************************/
function testChar(nbr){
	var i,j,k;
	var test=true;
	var nbr="";
	
	for(i=4;i>=1;i--){
		for(j=1;j<=4;j++){
			if ((i!=j) && (document.getElementById("nbr"+i.toString()).value==document.getElementById("nbr"+j.toString()).value)){
				document.getElementById("nbr"+i.toString()).value="";
				test=false;	
			}
		}
	}
	x=test;
}
//********************FIN***PROCEDURE***//***FONCTION*******************************


/* *************************PROCEDURE*** / ***FONCTION******************************
	 *_____BUT: verifie si l'utilisateur ecrit le bon caractere
	 *__ENTREE: 1 entier en parametre, 1 booleen
	 *__SORTIE: 1 booleen
***********************************************************************************/
function VerifTouche(e){
	
	//proceder pour connaitre la valeur de touche entrée, et pour qu'il fonctionne sous IE
	var e =(e.keyCode ? e.keyCode : e.which);
	x=false;
	
	//test si la touche entrée est 0 a 9 ou effacer ou tab
	if ((e>=48 && e<=57) || (e==8) || (e==9)){
		x=true	
	}

	return(x);
}
//********************FIN***PROCEDURE***//***FONCTION*******************************


//**************************FIN****PRINCIPAL****************************************