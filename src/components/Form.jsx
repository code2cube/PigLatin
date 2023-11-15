import React, { useState } from 'react';

function Form() {
    const [eText, setEText] = useState('');
    const [pLText, setPLText] = useState('');

    //translate to Pig Latn
    function handleEnglishChange(event) {
        const eV = event.target.value;
        setEText(eV);
        if(eV.trim() !== "") {
            const lol = eV.trim().split(" "); //removing spaces and spliting
            const vowels = ["a", "i", "o", "u", "e"];
            for(let i=0; i < lol.length; i++) {
                const a = lol[i];
                if(a.length > 1) {
                    if(vowels.includes(a[0].toLowerCase())) {
                        lol[i] = lol[i] + "way"; //handles vowels
                    } else {
                        const z = lol[i].split("");
                        const char1 = z.shift(); //removing first letter so it can be added before ay
                        z.push(char1);
                        z.push("ay"); //follows rule by adding ay to end of word
                        lol[i] = z.join("");
                    }
                }
            }
            setPLText(lol.join(" "));
        }
    }

    //translate back to english
    function handlePigLatinChange(event) {
        const pLV = event.target.value;
        setPLText(pLV);
        if(pLV.trim() !== "") {
            const lol = pLV.trim().split(" "); //removing spaces and spliting
            for(let i=0; i < lol.length; i++) {
                const a = lol[i];
                if(a.slice(-3) === "way") { //checking to see if way is at the end only
                    lol[i] = lol[i].replace("way", ""); //removing way from word
                    setEText(lol.join(" "))
                } else if(a.slice(-2) === "ay"){
                    if(lol[i].length > 2) {
                        lol[i] = lol[i].slice(0, -2);
                        lol[i] = lol[i][lol[i].length - 1] + lol[i].slice(0, -1); //removed ay and added the last letter back to front of word
                    }
                    setEText(lol.join(" "))
                } else {
                    setEText(lol.join(" "))
                }
            }
        }
    }

    function swap() {
        const a = document.getElementById('eLabel');
        const b = document.getElementById('pLabel');
        const c = document.getElementById('eTextArea');
        const d = document.getElementById('plTextArea');

        while(a) {
            if(a.style.textDecoration === "underline") {
                //pig latin mode
                a.style.textDecoration = "none";
                b.style.textDecoration = "underline";

                c.disabled = true;
                d.disabled = false;
            } else {
                //english mode
                a.style.textDecoration = "underline";
                b.style.textDecoration = "none";

                c.disabled = false;
                d.disabled = true;
            }
            break;
        }
    }

    return (
        <div>
            <div className="container-fluid">
                <div className="container text-center">
                    <form>
                        <div class="mb-3">
                            <label for="eTextArea" class="form-label" id="eLabel">English</label>
                            <textarea class="form-control" id="eTextArea" rows="5" value={eText} onChange={handleEnglishChange}></textarea>
                        </div>
                        <div className="mb-3">
                            <i class="bi bi-arrow-down-up" id="swap-arrow" onClick={swap}></i>
                        </div>
                        <div class="mb-3">
                            <label for="plTextArea" class="form-label" id="pLabel">Pig Latin</label>
                            <textarea class="form-control" id="plTextArea" rows="5" value={pLText} onChange={handlePigLatinChange} disabled></textarea>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Form;
