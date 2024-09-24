import {Component, h, Listen, Prop, State, Host, Element, Method} from '@stencil/core';

@Component({
  tag:'my-array',
  shadow: true
})
export class MyArray {
  @Prop({ mutable: true }) itemValue: string;
  @Prop({ mutable: true }) dataItems: string[];
  
  @Prop({ 
    mutable: true, 
    attribute: 'completed', 
    reflect: true }) isComplete = true;

  @Prop() thingToDo: string;

  @Element() el!:HTMLElement;

  @Listen('keydown')
  handleKeyDow(ev: KeyboardEvent) {
    if (ev.key ==='Enter') {
      this.dataItems = [...this.dataItems, this.itemValue];
      this.itemValue = "";
    }
  }

  @Method()
  async showPrompt() {
    return 60;
  }
    
  private handleAddItem(e:any) {
    this.itemValue = e.target.value;
  }
  
  private handleRemoveItem(index:number) {
    this.dataItems = this.dataItems.filter((_, i) => i !== index);
  }
  
  render(){
    return <Host>
      <h3>{this.thingToDo}</h3>
      <ul>
        {this.dataItems
              .map((item, index) => 
                   <li key={index} onClick={()=>this.handleRemoveItem(index)}>{item}</li>)}
      </ul>   

      <input 
        type='text' 
        value={this.itemValue}
        onInput={(e)=>this.handleAddItem(e)}
      ></input>
    </Host>
  }
}
