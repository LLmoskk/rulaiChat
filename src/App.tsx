import { defineComponent, ref } from "vue";
import "./App.css";
import Logo from "./assets/meditation.png";
import GithubLogo from "./assets/github-mark.png";

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
        "如来了吗？",
        "如来吗 ~",
        "他真来了吗?",
        "来没来?",
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
          <a href="https://github.com/LLmoskk/rulaiChat" target="_blank">
            <img class="github" src={GithubLogo} />
          </a>
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
