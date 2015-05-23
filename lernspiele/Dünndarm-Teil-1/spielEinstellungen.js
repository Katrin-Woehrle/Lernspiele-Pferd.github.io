function anzahl_der_Spieler_wechselt(new_value)
{
    akt_spieleranzahl = parseInt(new_value);
    nach_Spieleinstellungen_fragen();
}

//---------------------------------------------------

function nach_Spieleinstellungen_fragen()
{
    einstellungsseite_zaehler++;

    schreibe_html_ueberschriften("Lernspiel: Einstellungen");

    output_fenster.document.write ("<br><u><b><font size=\"+1\">Einstellungen für das Spiel</font></b></u>");

    output_fenster.document.write ("<form name=\"form_SpielEinstellungen\">\n");

    output_fenster.document.write ("<br><select name=\"select_AnzahlDerSpieler\" size=\"1\" onChange=\"top.anzahl_der_Spieler_wechselt(document.form_SpielEinstellungen.select_AnzahlDerSpieler.value);\"> \n");
    for (i=1; i <= max_spieler; i++)
    {   
        output_fenster.document.write ('<option value="' + i + '">' + i + '</option>\n');
    }
    output_fenster.document.write ("</select>\n");
    output_fenster.document.form_SpielEinstellungen.select_AnzahlDerSpieler.selectedIndex = akt_spieleranzahl - 1;
    output_fenster.document.write ("Wieviele Spieler spielen mit? <br>\n");
   
    var min_copies = 1;
    if (max_zusammenpassende_bilder >= 2)
    {
        min_copies = 0;
        if (einstellungsseite_zaehler == 1)
        {
            akt_kopien = 0;
        }
    }    
   
    if (akt_kopien == 0)
    {
        anzahl_zusammenpassende_bilder = set_matching_images;               
    }
    else
    {
        anzahl_zusammenpassende_bilder = akt_kopien + 1;
    }

    anzahl_der_bilder = (akt_kopien + 1) * verwendete_bilder;    

    output_fenster.document.write ('<br><input type="button" name="button_SpielStarten" value="Starte das Lernspiel zu Thema 3: Dünndarm Teil 1" onClick="top.starte_spiel();"><br>\n');
    output_fenster.document.write ('<br><input type="button" name="button_BilderZeigen" value="Zeige alle Fragen und Antworten" onClick="top.zeige_bilder();"><br>\n');
       
    output_fenster.document.write ("</form>\n");
 } 

//-----------------------   zeige_bilder ()   ---------------------------

function zeige_bilder()
{    
    schreibe_html_ueberschriften("Memoryspiel: Bilder anzeigen");

    output_fenster.document.write ("<form name=\"form_bilder_anzeigen\">\n");

    output_fenster.document.write ("<input type=\"button\" name=\"button_BeendeSpiel\" value=\"Zurück zu den Einstellungen\" onClick=\"top.nach_Spieleinstellungen_fragen();\">\n");
  
    output_fenster.document.write ("</form>\n");

    var alt_text;                              
    for (i = 0; i < anzahl_der_vordefinierten_bilder; i++)
    {         
         alt_text = "Bild_" + (i+1) + ":_" + vordefinierte_bilder_namen[i];
         output_fenster.document.write ('<img src="' + vordefinierte_bilder_namen[i] + '" height= "200" width="200" border="1" alt="' + alt_text + '" name="image' + i + '" >');
    }

    output_fenster.document.write ("</form>\n");
}
