import { defineComponent, ref } from "vue";
import "./App.css";
import Logo from "./meditation.png";

interface Message {
  question: string;
  answer: string;
}

export default defineComponent({
  setup() {
    const input = ref("");
    const contentRef = ref<HTMLInputElement | null>(null);

    const messages: Array<Message> = [];

    const scrollCotent = () => {
      const contentHeight = contentRef.value?.scrollHeight;
      setTimeout(() => {
        contentRef.value?.scroll({
          top: contentHeight,
          behavior: "smooth",
        });
      }, 200);
    };

    const addNewQuestion = (e: KeyboardEvent) => {
      if (e.key !== "Enter" || !input.value) return;
      const answerTemplate = [
        "如来。",
        "如来！",
        "如来？",
        "如来~",
        "诶，如来",
      ];
      const answer =
        answerTemplate[Math.floor(Math.random() * answerTemplate.length)];
      const newMessage = {
        question: input.value,
        answer,
      };
      messages.push(newMessage);
      input.value = "";
      scrollCotent();
    };

    return () => (
      <div class="app-body">
        <div class="header">
          <img class="logo" src={Logo} />
          <h1>RuLaiChat</h1>
        </div>
        <div class="content" ref={contentRef}>
          {messages.length > 0 &&
            messages.map((item) => (
              <>
                <el-card class="box-card">{item.question}</el-card>
                <el-card class="box-card">{item.answer}</el-card>
              </>
            ))}
        </div>

        <el-input
          v-model={input.value}
          placeholder="Please input"
          onKeyup={addNewQuestion}
          clearable
        />
      </div>
    );
  },
});
