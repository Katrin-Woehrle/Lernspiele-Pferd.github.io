//lernspielScript.js

function starte_spiel()
{
    init_neues_spiel();
    mix_images();
}

//----------------------------------------------------------------------------

function beende_spiel()
{
    if (confirm("Willst du das Spiel abbrechen und ein neues starten?"))
    {
        nach_Spieleinstellungen_fragen();
    }
}

//-----------------------   mix_array ()   ------------------------------------

function mix_array (data_array, index_array)
{   
    function combi(data, index)
    {
        this.data  = data;
        this.index = index;
    }
   
    function combi_sort (a, b)
    {        
        var result = -1;
        if (a.data > b.data)
        {
            result = 1;
        }
        else if (a.data == b.data)
        {
            result = 1;
        }

        return result;
    }

    var array_length = data_array.length;
    var sort_array = new Array (array_length);
    var i;
    
    for (i = 0;   i < array_length;   i++)
    {
          sort_array[i] = new combi(data_array[i], index_array[i]);
    }

    sort_array.sort(combi_sort);
 
    for (i = 0;   i < array_length;   i++)
    {
          data_array[i]  = sort_array[i].data;
          index_array[i] = sort_array[i].index;
    }
}

//--------------------------------------------------------------------------

function init_neues_spiel()
{    
    generiere_gemischtes_bild_array();

    init_variablen_vor_neuem_spiel();

    zeichne_html_spiel();

    ausgabe_aktueller_spiel_werte();
 }

//--------------------------------------------------

function generiere_gemischtes_bild_array()
{    
    var step = (akt_kopien > 0) ?  1 : anzahl_zusammenpassende_bilder;
    var hilfs_array   = new Array ();
    var random_array = new Array (anzahl_der_vordefinierten_bilder);
    random_array.length   = 0;   
    hilfs_array.length     = 0;   

   for (i=0; i < (anzahl_der_vordefinierten_bilder - step + 1); i += step)
    {
        random_array[random_array.length]=Math.random();
        hilfs_array[hilfs_array.length]=i;
    }

    mix_array (random_array, hilfs_array);
   
    gemischte_bilder.length   = 0;    
    indexes_array.length  = 0;
    random_array.length   = 0;
    index = 0;
    for (i = 0;   i < (verwendete_bilder / step);   i++)
    {
        for (j = 0;   j <= akt_kopien;   j++)    
        {
            for (k = 0;   k < step;   k++)      
            {
                gemischte_bilder[gemischte_bilder.length] = vordefinierte_bilder_namen[hilfs_array[i] + k];
                indexes_array[indexes_array.length] = index++;
                random_array[random_array.length] = Math.random();
            }
        }
    }

    mix_array (random_array, indexes_array);
} 

//----------------------------------------------------------------------

function init_variablen_vor_neuem_spiel()
{
    akt_spieler    = 1;
    runden_zaehler = 1;
    aufgedeckte_bilder_in_der_runde = 0;
    zuletzt_angeklickt_index.length = 0;
    for (i = 0;   i < anzahl_zusammenpassende_bilder;   i++)
    {
        zuletzt_angeklickt_index[zuletzt_angeklickt_index.length] = -1;
    }

    punkte_des_spielers.length = 0;
    for (i = 0;   i < akt_spieleranzahl;   i++)
    {
        punkte_des_spielers[punkte_des_spielers.length] = 0;
    }

 }

//------------------------------------------------------------------------

function zeichne_html_spiel()
{
    
    schreibe_html_ueberschriften("Memoryspiel: Das Spiel läuft");

    output_fenster.document.write ("<form name=\"form_Game\">\n");

    output_fenster.document.write ("<font size=\"-1\">Runde </font> <input type=\"text\" name=\"input_rounds\" size=\"2\" disabled></input> \n");
   
    for (i = 1; i <= akt_spieleranzahl; i++)
    {
        output_fenster.document.write ("<font size=\"-1\">Spieler " + i + ": </font><input type=\"text\" name=\"eingabe_spieler" + i + "\" size=\"3\" readonly></input> \n");
    }
 
     output_fenster.document.write ("<font size=3 color=\"red\">Spieler Nr.<input type=\"text\" name=\"input_akt_spieler\" size=\"2\" disabled></input>ist dran! \n </font>");
   
     output_fenster.document.write ("<input type=\"button\" name=\"button_BeendeSpiel\" value=\"Beende das Memoryspiel\" onClick=\"top.beende_spiel();\">&nbsp;");
  
     output_fenster.document.write ("<font size=2 color=\"black\">Thema 4: Dickdarm Teil 2, Lernspiel von Katrin Wöhrle</font>");

     output_fenster.document.write ("</form>\n");

    var alt_text;                              
    for (i = 0; i < anzahl_der_bilder; i++)
    {         
         alt_text = "Memoryteil_" + (i+1);
         if (zeige_bild_name == true)
         {
             alt_text += ":_";    
             alt_text += gemischte_bilder[indexes_array[i]];
         }
         output_fenster.document.write ('<img src="' + verdecktes_bild_name + '" height= "195" width="195" border="1" alt="' + alt_text + '" name="image' + i + '" onClick="top.show_hidden_image(this)">');
    }

}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function ausgabe_aktueller_spiel_werte()
{
    output_fenster.document.form_Game.input_akt_spieler.value = akt_spieler;
    output_fenster.document.form_Game.input_rounds.value = runden_zaehler;

    for (i = 1; i <= akt_spieleranzahl; i++)
    {
        var element_name = "eingabe_spieler" + i;
        var input_elements = output_fenster.document.getElementsByName(element_name);

        if (input_elements)
        {
            if (i == akt_spieler)
            {
                input_elements[0].size = 25;
                if (aufgedeckte_bilder_in_der_runde < anzahl_zusammenpassende_bilder)
                {
                    input_elements[0].value = (aufgedeckte_bilder_in_der_runde + 1) +
                         ". Bild aufdecken! " + punkte_des_spielers[i - 1] + " gefunden";
                }
                else
                {
                    input_elements[0].value =
                         "Bilder zudecken. " + punkte_des_spielers[i - 1] + " gefunden";
                }
                input_elements[0].focus();
                input_elements[0].style.color = 'blue';
                //input_elements[0].select();
            }
            else
            {
                input_elements[0].size = 3;
                input_elements[0].value = punkte_des_spielers[i - 1];
            }
        }
    }

}

//---------------------------------------------------------------------------

function show_hidden_image (clicked_image)
{
    if (aufgedeckte_bilder_in_der_runde < anzahl_zusammenpassende_bilder)
    {
        var clicked_index = -1;    
        clicked_index = parseInt(clicked_image.name.substr(5,10));
        if (clicked_image.src.search(verdecktes_bild_name) != -1)
        {
            displayed_picture_index = indexes_array[clicked_index];
            output_fenster.document.images[clicked_index].src = gemischte_bilder[displayed_picture_index];

            zuletzt_angeklickt_index[aufgedeckte_bilder_in_der_runde] = clicked_index;
            aufgedeckte_bilder_in_der_runde++;

            if (aufgedeckte_bilder_in_der_runde == anzahl_zusammenpassende_bilder)
            {
                var matching = true;
                for (i = 0;   i < (anzahl_zusammenpassende_bilder - 1);   i++)
                {
                    if (Math.floor(indexes_array[zuletzt_angeklickt_index[i]  ] / anzahl_zusammenpassende_bilder)
                    !=  Math.floor(indexes_array[zuletzt_angeklickt_index[i+1]] / anzahl_zusammenpassende_bilder))
                    {
                        matching = false;
                    }
                }

                if (matching == true)
                {                   
                    punkte_des_spielers[akt_spieler - 1]++;
                    for (i = 0;   i < anzahl_zusammenpassende_bilder;   i++)
                    {                       
                        zuletzt_angeklickt_index[i] = -1;
                    }
                    aufgedeckte_bilder_in_der_runde = 0;
                   
                    var found_images = 0;
                    for (i = 0;   i < akt_spieleranzahl;   i++)
                    {
                        found_images += punkte_des_spielers[i];
                    }
                    found_images *= anzahl_zusammenpassende_bilder;
                    if (found_images == anzahl_der_bilder)
                    {
                        ausgabe_aktueller_spiel_werte();   
                        if (akt_spieleranzahl == 1)
                        {
                            alert ("Herzlichen Glückwunsch !\n Du hast alle Karten richtig zugeordnet. \n Drücke OK um ein neues Spiel zu starten.");
                        }
                        else
                        {
                            alert ("Herzlichen Glückwunsch !\n Ihr habt alle Karten richtig zugeordnet. \n Drückt OK um ein neues Spiel zu starten.");
                        }
                        nach_Spieleinstellungen_fragen();
                        return;
                    }

                }
                else
                {
                    // Bilder passen nicht zusammen: warte einfach auf den nächsten Klick auf ein Bild,
                    // bevor sie wieder verdeckt werden und springe zum nächsten Spieler.
                }
            }
        }
    }   
    else
    {       
        for (i = 0;   i < anzahl_zusammenpassende_bilder;   i++)
        {
            output_fenster.document.images[zuletzt_angeklickt_index[i]].src = verdecktes_bild_name;
            zuletzt_angeklickt_index[i] = -1;
        }

        aufgedeckte_bilder_in_der_runde = 0;
        if (akt_spieler == akt_spieleranzahl)
        {
            akt_spieler = 1;
            runden_zaehler++;
        }
        else
        {
            akt_spieler++;
        }
    }

    ausgabe_aktueller_spiel_werte();

    return;

}

//------------------------------------------------------------------

function mix_images()
{
    random_array = new Array(anzahl_der_bilder);
    index_array  = new Array(anzahl_der_bilder);
    for (i=0; i < anzahl_der_bilder; i++)
    {
        random_array[i] = Math.random();
        index_array[i]  = i;
    }

    mix_array (random_array, index_array);
}
