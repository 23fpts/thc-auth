<template>
  <div class="system-org">
    <el-card body-style="padding: 0">
      <el-form ref="orgQueryform" :model="orgQueryform" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="组织名称" prop="name">
              <el-input
                v-model="orgQueryform.name"
                placeholder="请输入组织名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否禁用" prop="status">
              <el-select
                v-model="orgQueryform.status"
                placeholder="请选择组织状态"
              >
                <el-option label="未禁用" value="false"></el-option>
                <el-option label="已禁用" value="true"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="6">
            <el-form-item>
              <el-button
                type="primary"
                @click="submitQueryForm()"
                icon="el-icon-search"
                >查询</el-button
              >
              <el-button
                type="primary"
                plain
                @click="resetQueryForm('orgQueryform')"
                icon="el-icon-refresh"
                >重置</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card>
      <el-table
        :data="tableData"
        row-key="id"
        border
        default-expand-all
        stripe
        style="width: 100%;margin-bottom: 20px;"
      >
        <el-table-column
          prop="orgName"
          label="组织名称"
          width="200"
          fixed="left"
        />
        <el-table-column
          prop="phone"
          label="联系电话"
          width="200"
          align="center"
        />
        <el-table-column
          prop="email"
          label="email"
          width="200"
          align="center"
        />
        <el-table-column prop="sort" label="排序" width="200" align="center" />
        <el-table-column
          prop="status"
          label="是否禁用"
          width="200"
          align="center"
          :formatter="statusFormat"
        />
        <el-table-column prop="address" label="地址" width="" align="center" />
        <el-table-column label="操作" width="90" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              circle
              @click="handleEdit(scope.$index, scope.row)"
            />
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="handleDelete(scope.$index, scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getOrgTree } from '@/api/system'

export default {
  data() {
    return {
      tableData: [],
      orgQueryform: {
        name: '',
        status: null,
      },
    }
  },
  created() {},
  methods: {
    handleEdit(index, row) {
      // index 是行号，0开始
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    // statusFormat(row, column) {
    statusFormat(row) {
      if (row.status) {
        return '已禁用'
      } else {
        return '未禁用'
      }
    },
    submitQueryForm() {
      console.log('submit')
      getOrgTree({
        name: this.orgQueryform.name,
        status: this.orgQueryform.status,
      }).then((res) => {
        console.log(res)
        this.setData(res)
      })
    },
    resetQueryForm(formName) {
      this.$refs[formName].resetFields()
      this.submitQueryForm(formName)
    },
    setData(orgtree) {
      if (orgtree.success) {
        this.tableData = orgtree.data
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    getOrgTree({ name: '', status: null }).then((res) => {
      next((vm) => vm.setData(res))
    })
  },
}
</script>

<style lang="scss" scoped></style>
