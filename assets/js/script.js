const { createApp } = Vue;

createApp({
  data() {
    return {
      searchbar: "",
      messageInput: "",
      activeContact: 0,
      contacts: [
        {
          name: "Michele",
          avatar: "./assets/img/avatar_1.jpg",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Hai portato a spasso il cane?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Ricordati di stendere i panni",
              status: "sent",
            },
            {
              date: "10/01/2020 16:15:22",
              message: "Tutto fatto!",
              status: "received",
            },
          ],
        },
        {
          name: "Fabio",
          avatar: "./assets/img/avatar_2.jpg",
          visible: true,
          messages: [
            {
              date: "20/03/2020 16:30:00",
              message: "Ciao come stai?",
              status: "sent",
            },
            {
              date: "20/03/2020 16:30:55",
              message: "Bene grazie! Stasera ci vediamo?",
              status: "received",
            },
            {
              date: "20/03/2020 16:35:00",
              message: "Mi piacerebbe ma devo andare a fare la spesa.",
              status: "sent",
            },
          ],
        },
        {
          name: "Samuele",
          avatar: "./assets/img/avatar_3.jpg",
          visible: true,
          messages: [
            {
              date: "28/03/2020 10:10:40",
              message: "La Marianna va in campagna",
              status: "received",
            },
            {
              date: "28/03/2020 10:20:10",
              message: "Sicuro di non aver sbagliato chat?",
              status: "sent",
            },
            {
              date: "28/03/2020 16:15:22",
              message: "Ah scusa!",
              status: "received",
            },
          ],
        },
        {
          name: "Alessandro B.",
          avatar: "./assets/img/avatar_4.jpg",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Lo sai che ha aperto una nuova pizzeria?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Si, ma preferirei andare al cinema",
              status: "received",
            },
          ],
        },
        {
          name: "Alessandro L.",
          avatar: "./assets/img/avatar_5.jpg",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ricordati di chiamare la nonna",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Va bene, stasera la sento",
              status: "received",
            },
          ],
        },
        {
          name: "Claudia",
          avatar: "./assets/img/avatar_6.jpg",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ciao Claudia, hai novità?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Non ancora",
              status: "received",
            },
            {
              date: "10/01/2020 15:51:00",
              message: "Nessuna nuova, buona nuova",
              status: "sent",
            },
          ],
        },
        {
          name: "Federico",
          avatar: "./assets/img/avatar_7.jpg",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Fai gli auguri a Martina che è il suo compleanno!",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Grazie per avermelo ricordato, le scrivo subito!",
              status: "received",
            },
          ],
        },
        {
          name: "Davide",
          avatar: "./assets/img/avatar_8.jpg",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ciao, andiamo a mangiare la pizza stasera?",
              status: "received",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "No, l'ho già mangiata ieri, ordiniamo sushi!",
              status: "sent",
            },
            {
              date: "10/01/2020 15:51:00",
              message: "OK!!",
              status: "received",
            },
          ],
        },
      ],
    };
  },

  methods: {
    subtractSubstring(fullString) {
      const changedString = fullString
        .toLowerCase()
        .replace(this.searchbar.toLowerCase(), "");
      if (this.searchbar.length > 0) {
        return changedString;
      } else {
        return changedString.charAt(0).toUpperCase() + changedString.slice(1);
      }
    },

    lastMessageSent(array) {
      return array.length - 1;
    },

    sendMessage() {
      if (this.messageInput.length >= 1) {
        let newMessage = {
          date: this.getCurrentDateTime(),
          message: this.messageInput,
          status: "sent",
        };
        this.contacts[this.activeContact].messages.push(newMessage);
        // console.log(this.contacts);
        setTimeout(this.replyMessage, 2000);
      }
      this.messageInput = "";

      //Changing the mic icon when the message is sent
      const sendIcon = document.getElementById("mic-send");
      console.log(sendIcon);
      sendIcon.innerHTML = `<i class="fa-solid fa-up-long fa-bounce fa-2xl"></i>`;

      setTimeout(function () {
        sendIcon.innerHTML = `<i class="fa-solid fa-microphone fa-2xl"></i>`;
      }, 1700);
    },

    replyMessage() {
      let messageReceived = {
        date: this.getCurrentDateTime(),
        message: "ok",
        status: "received",
      };
      this.contacts[this.activeContact].messages.push(messageReceived);
    },

    deleteMessage(id) {
      let activeArray = this.contacts[this.activeContact].messages;
      activeArray.splice(id, 1);
      const dropdowns = document.querySelectorAll(".info-msg");
      dropdowns.forEach((el) => (el.style.display = "none"));
    },

    transformDate(date) {
      let splitDate = date.split(" ");
      let newDate = splitDate[1].slice(0, -3);
      return newDate;
    },

    showDropdown(id) {
      const dropdowns = document.querySelectorAll(".info-msg");
      if (dropdowns[id].style.display == "block") {
        dropdowns[id].style.display = "none";
      } else {
        dropdowns.forEach((el) => (el.style.display = "none"));
        dropdowns[id].style.display = "block";
      }
    },

    getCurrentDateTime() {
      const today = new Date();
      let minutes = today.getMinutes();
      if (minutes < 10) {
        minutes = "0" + minutes;
      }

      let seconds = today.getSeconds();
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      const date =
        today.getFullYear() +
        "/" +
        (today.getMonth() + 1) +
        "/" +
        today.getDate();
      const time = today.getHours() + ":" + minutes + ":" + seconds;

      return date + " " + time;
    },
  },

  created() {
    console.log(this.subtractSubstring("Mario"));
  },
}).mount("#app");
