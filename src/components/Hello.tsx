import { Component as Vue } from 'vue-tsx-support'
import { Component, Prop } from 'vue-property-decorator'

export interface HelloProps {
  name: string
}

@Component
export class Hello extends Vue<HelloProps> {
  @Prop({ type: String, required: true })
  name: HelloProps['name']

  render() {
    return <p>Hello {this.name}</p>
  }
}
