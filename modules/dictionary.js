class Dictionary_tooltip {
    constructor() {
        this.main_dom_element = "";
    }

    create_tooltip(existing_dom_element) {
        if (!existing_dom_element) {

            let dictionary_wrapper = document.createElement("div");
            dictionary_wrapper.classList = "dict";

            let dictionary_header = document.createElement("div");
            dictionary_header.classList = "dict-header";

            let dictionary_title = document.createElement("div");
            dictionary_title.classList = "dict-title";
            dictionary_title.innerText = "Word";

            let dictionary_audio = document.createElement("img");
            dictionary_audio.classList = "dict-audio";
            dictionary_audio.title = "listen";
            dictionary_audio.alt = "listen";
            dictionary_audio.src = browser.extension.getURL("../icons/audio.svg");

            let hr = document.createElement("hr");
            hr.classList = "dict-hr";

            let dictionary_desc = document.createElement("div");
            dictionary_desc.classList = "dict-desc";
            dictionary_desc.innerText = "Here comes the description";

            let dictionary_more_btn = document.createElement("button");
            dictionary_more_btn.classList = "dict-more"
            dictionary_more_btn.innerText = "More";

            dictionary_header.appendChild(dictionary_title);
            dictionary_header.appendChild(dictionary_audio);

            dictionary_wrapper.appendChild(dictionary_header);
            dictionary_wrapper.appendChild(hr);
            dictionary_wrapper.appendChild(dictionary_desc);
            dictionary_wrapper.appendChild(dictionary_more_btn);

            document.body.appendChild(dictionary_wrapper);

            this.main_dom_element = dictionary_wrapper;
        } else {
            this.main_dom_element = existing_dom_element
        }

    }

    place_tooltip(mouseX, mouseY) {

        let window_H = window.innerHeight;
        let window_W = window.innerWidth;

        let tool_h = this.main_dom_element.getBoundingClientRect().height;
        let tool_w = this.main_dom_element.getBoundingClientRect().width;

        let tool_final_x = 0, tool_final_y = 0;

        // for X co-ordinate
        if (window_W - mouseX >= tool_w) {
            tool_final_x = mouseX;
        } else {
            if (mouseX >= tool_w) {
                tool_final_x = mouseX - tool_w;
            } else {
                tool_final_x = window_W - tool_w;
            }
        }
        // for Y co-ordinate
        let yoff = 12; //to create some space for text 
        if (window_H - mouseY - yoff >= tool_h) {
            tool_final_y = mouseY + yoff + window.scrollY;
        } else {
            if (mouseY >= tool_h + yoff) {
                tool_final_y = mouseY - tool_h - yoff + window.scrollY;
            } else {
                tool_final_y = window.screenY + window_H - tool_h;
            }
        }

        this.main_dom_element.style.left = `${tool_final_x}px`;
        this.main_dom_element.style.top = `${tool_final_y}px`;

    }

    write_definition(word, definition) {

        let title = this.main_dom_element.getElementsByClassName("dict-title")[0];
        let audio = this.main_dom_element.getElementsByClassName("dict-audio")[0];
        let desc = this.main_dom_element.getElementsByClassName("dict-desc")[0];
        let more = this.main_dom_element.getElementsByClassName("dict-more")[0];

        title.innerText = capitalize(resize_string(word, 70));
        if (definition) {
            desc.innerText = resize_string(definition, 220);
        } else {
            desc.innerText = "Sorry! nothing found :(";
        }

        more.onclick = () => {
            window.open(`https://www.google.com/search?q=${word}+meaning`);
        };
        audio.onclick = () => {
            let msg = new SpeechSynthesisUtterance(`${word}`);
            window.speechSynthesis.speak(msg);

        }
    }

    delete_tooltip() {
        this.main_dom_element.remove();
    }
}

const resize_string = (input_string, limit_length) => {
    if (input_string.length > limit_length) {
        input_string = input_string.slice(0, limit_length) + "...";
    }
    return input_string;
}

const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}