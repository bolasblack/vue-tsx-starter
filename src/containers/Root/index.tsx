import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { Hello } from '../../components/Hello'
import VueHello from '../../components/VueHello.vue'
import './style.less'

@Component
export class Root extends Vue {
  private inputValue = 'world'

  render() {
    return (
      <div class="page__container">
        <div class="page__main">
          <VueHello name={this.inputValue} />

          <Hello name={this.inputValue} />

          <p>
            <input v-model={this.inputValue} />
          </p>
        </div>
      </div>
    )
  }
}
