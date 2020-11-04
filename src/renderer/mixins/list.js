export default {
  data() {
    return {
      searchQuery: '',
      itemMenuActive: false,
      emptyCenterStateActive: false
    }
  },

  beforeRouteUpdate(to, from, next) {
    if (to.params.refresh) {
      this.fetchAll()
    }
    next()
  },

  created() {
    this.fetchAll()
  },

  methods: {
    async fetchAll() {
      try {
        await this.$request(this.FetchAll)

        if (this.ItemList.length > 0) {
          this.onClickItem(this.ItemList[0].id)
        }
      } catch (error) {
        console.log(error)
      }
    }
  },

  computed: {
    filteredList() {
      return this.ItemList.filter(item =>
        Object.values(item).some(value =>
          (value ? value.toString() : '').includes(this.searchQuery.toLowerCase())
        )
      )
    }
  }
}
