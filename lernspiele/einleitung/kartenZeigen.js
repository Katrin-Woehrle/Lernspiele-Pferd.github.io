function zeichne_html_spiel()
{
    output_fenster.document.write ("<form name=\"form_Game\">\n");

    output_fenster.document.write ("<font size=\"+1\"5>Runde </font> <input type=\"text\" name=\"input_rounds\" size=\"3\" disabled></input> \n");
   
    for (i = 1; i <= akt_spieleranzahl; i++)
    {
        output_fenster.document.write ("<font size=\"+1\">Spieler " + i + ": </font><input type=\"text\" name=\"eingabe_spieler" + i + "\" size=\"3\" readonly></input> \n");
    }
 
     output_fenster.document.write ("<font size=5 color=\"red\">Wer ist dran? Spieler Nr.<input type=\"text\" name=\"input_akt_spieler\" size=\"2\" disabled></input> \n </font>");
   
     output_fenster.document.write ("<input type=\"button\" name=\"button_BeendeSpiel\" value=\"Beende das Memoryspiel\" onClick=\"top.beende_spiel();\">\n");
  
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
         output_fenster.document.write ('<img src="' + verdecktes_bild_name + '" height= "200" width="200" border="0" alt="' + alt_text + '" name="image' + i + '" onClick="top.show_hidden_image(this)">');
    }

}
