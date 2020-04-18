new Vue({
  el: '#app',
  data() {
    return {
      shortcutKeys: [],
    };
  },
  created() {
    chrome.storage.sync.get({
      shortcutKeys: [],
    }, (itemMap) => {
      this.$data.shortcutKeys = itemMap.shortcutKeys;
    });
  },
  methods: {
    /**
     * ショートカットキーの追加
     */
    addShortcutKey() {
      this.$data.shortcutKeys.push({
        actionKey: '',
        scriptCode: '',
      });
    },
    /**
     * ショートカットキーの削除
     * @param {number} index - 番号
     */
    removeShortcutKey(index) {
      this.$data.shortcutKeys.splice(index, 1);
    },
    /**
     * 保存する
     */
    onSave() {
      // Vue.jsのメソッドとかも保存してしまっているので、データだけ切り出す必要があるかも
      chrome.storage.sync.set({
        shortcutKeys: this.$data.shortcutKeys,
      });
    },
  },
  template: `
    <div>
      <div>
        <template v-for="(shortcutKey, index) in $data.shortcutKeys">
          <div>
            <div>
              <label>アクションキー：</label>
              <input v-model="shortcutKey.actionKey"></input>
            </div>
            <label>スクリプトコード：</label>
            <br/>
            <textarea class="script-code" v-model="shortcutKey.scriptCode"></textarea>
            <br/>
            <button @click="removeShortcutKey(index)">削除</button>
          </div>
          <br/>
        </template>
      </div>
      <button @click="addShortcutKey">追加</button>
      <br/>
      <button @click="onSave">保存</button>
    </button>
  `,
});
