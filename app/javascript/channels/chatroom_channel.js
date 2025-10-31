import consumer from "./consumer";

document.addEventListener("turbo:load", () => {
  const messagesContainer = document.getElementById("messages");
  if (!messagesContainer) return;

  consumer.subscriptions.create({ channel: "ChatroomChannel" }, {
    connected() {
      console.log("Connected to ChatroomChannel!");
    },

    disconnected() {
      console.log("Disconnected from ChatroomChannel!");
    },

    received(data) {
      // Append the new message to the feed
      messagesContainer.querySelector(".ui.feed").insertAdjacentHTML("beforeend", data.message);

      // Scroll to bottom
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  });
});