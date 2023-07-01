import { createApp } from 'vue'
import App from './App.tsx'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App).use(ElementPlus).mount('#app')
