import { html, css, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('app-master-view')
export default class MasterView extends LitElement {
  static styles = css`
    :host {
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: stretch;
      align-content: stretch;
    }
    .row-layout {
      display: flex;
    }
    .group {
      justify-content: flex-start;
      align-items: stretch;
      align-content: flex-start;
      position: relative;
      width: 326px;
      min-width: 326px;
      max-width: 326px;
    }
    .column-layout {
      display: flex;
      flex-direction: column;
    }
    .group_1 {
      justify-content: flex-start;
      align-items: stretch;
      align-content: flex-start;
      position: relative;
      padding: 16px;
      width: 724px;
      height: 1095px;
      min-width: 50px;
      min-height: 50px;
      max-width: 724px;
      max-height: 1095px;
    }
    .group_2 {
      justify-content: flex-start;
      align-items: stretch;
      align-content: flex-start;
      position: relative;
      width: 510px;
      height: 1019px;
      min-width: 50px;
      min-height: 50px;
      max-width: 510px;
      max-height: 1019px;
    }
    .group_3 {
      justify-content: flex-start;
      align-items: stretch;
      align-content: flex-start;
      position: relative;
      padding: 16px;
      width: 511px;
      height: 98px;
      min-width: 50px;
      min-height: 50px;
      max-width: 511px;
      max-height: 98px;
    }
    .group_4 {
      justify-content: flex-start;
      align-items: stretch;
      align-content: flex-start;
      position: relative;
      padding: 16px;
      min-width: 50px;
      min-height: 50px;
      flex-grow: 1;
      flex-basis: 0;
    }
  `;

  @state()
  private loyal?: Date;

  @state()
  private duration?: number;

  render() {
    return html`
      <link rel='stylesheet' href='../../ig-theme.css'>
      <div class="row-layout group">
        <div class="column-layout group_1"></div>
      </div>
      <div class="column-layout group_2">
        <div class="column-layout group_3"></div>
        <div class="column-layout group_4"></div>
      </div>
    `;
  }
}
