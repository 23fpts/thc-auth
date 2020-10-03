<template>
  <div class="system-org">
    <el-card body-style="padding: 0">
      <!-- 新增 -->
      <el-button
        type="primary"
        size="small"
        style="margin: 0 0 10px 20px"
        icon="el-icon-plus"
        @click="handleAdd()"
        >新增</el-button
      >
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

    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogFormVisible"
      :before-close="beforeDialogClose"
    >
      <el-form
        :model="dialogForm"
        ref="dialogForm"
        :rules="dialogFormRules"
        label-width="80px"
      >
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="上级组织" prop="orgPid">
              <el-tree-select
                :elTreeProps="elTreeProps"
                :elTreeData="tableData"
                :defaultSelectedId="dialogForm.orgPid"
                :disabled="elTreeDisabled"
                @handleTreeSelected="handleTreeSelected($event)"
                @validateSelectTree="validateSelectTree"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="组织名称" prop="orgName">
              <el-input
                v-model="dialogForm.orgName"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="phone">
              <el-input
                v-model="dialogForm.phone"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="email" prop="email">
              <el-input
                v-model="dialogForm.email"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序序号" prop="sort">
              <el-input-number
                v-model="dialogForm.sort"
                :min="1"
                label="描述文字"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="submitDialogForm" size="mini" type="primary"
          >确 定</el-button
        >
        <el-button @click="handleCloseDialog" size="mini">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getOrgTree, updateOrg, addOrg, deleteOrg } from '@/api/system'
import ElTreeSelect from '../../components/TreeSelect'

export default {
  components: { ElTreeSelect },
  data() {
    return {
      tableData: [],
      orgQueryform: {
        name: '',
        status: null,
      },
      elTreeDisabled: false,
      elTreeProps: {
        // el-tree-select配置项（必选）
        value: 'id',
        label: 'orgName',
        children: 'children',
      },
      dialogFormVisible: false,
      dialogTitle: '',
      dialogForm: {
        id: null,
        orgPid: null, // el-tree-select初始ID（可选）
        orgName: '',
        phone: '',
        email: '',
        sort: '',
      },
      dialogFormRules: {
        orgPid: [
          { required: true, message: '请选择上级组织机构', trigger: 'blur' },
        ],
        orgName: [
          { required: true, message: '请输入组织机构名称', trigger: 'blur' },
        ],
        sort: [
          {
            required: true,
            message: '请输入当前组织机构在同级组织内的排序序号',
            trigger: 'blur',
          },
        ],
        email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
        ],
        phone: [
          {
            pattern: /^1[34578]\d{9}$/,
            message: '目前只支持中国大陆的手机号码',
            trigger: 'blur',
          },
        ],
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
      this.$confirm('确定删除[' + row.orgName + ']?').then((_) => {
        this.dialogForm = { ...row } //从被选行赋值给dialogForm
        deleteOrg(this.dialogForm) //调用axios接口api
          .then((res) => {
            this.submitQueryForm() //删除之后，重新查询table
            this.$message({ message: res.data, type: 'success' })
          })
          .catch((err) => {
            this.$message({ message: err.message, type: 'success' })
          })
      })
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
    handleAdd() {
      this.elTreeDisabled = false //上级组织下拉单选是否禁用：false
      this.dialogFormVisible = true //显示弹出框
      this.dialogTitle = '新增组织机构' //弹出框标题
      this.resetDialogForm() //因为新增和修改共用一个表单，所以做数据清理
    },
    resetDialogForm() {
      this.dialogForm.id = null
      this.dialogForm.orgPid = null
      this.dialogForm.orgName = ''
      this.dialogForm.phone = ''
      this.dialogForm.email = ''
      this.dialogForm.sort = ''
    },
    submitDialogForm() {
      this.$refs.dialogForm.validate((valid) => {
        //根据上文的表单验证规则验证dialogForm表单
        if (valid) {
          //如果校验成功
          this.$confirm('确定提交数据么?') //让用户再次确认是否提交
            .then((_) => {
              //用户确认提交
              if (this.elTreeDisabled) {
                //elTreeDisabled=true表示是修改操作，handleEdit设置的
                updateOrg(this.dialogForm) //调用修改组织结构接口
                  .then((res) => {
                    this.$message({ message: res.data, type: 'success' }) //给用户提示信息
                    this.submitQueryForm() //修改之后，重新查询table
                    this.handleCloseDialog() //重置表单数据（在下文中介绍）
                  })
              } else {
                //elTreeDisabled=false表示是新增操作，handleAdd设置的
                addOrg(this.dialogForm).then((res) => {
                  //调用新增组织结构接口
                  this.$message({ message: res.data, type: 'success' }) //给用户提示信息
                  this.submitQueryForm() //新增之后，重新查询table
                  this.handleCloseDialog() //重置表单数据（在下文中介绍）
                })
              }
            })
            .catch((_) => {
              this.handleCloseDialog()
            }) //取消新增或修改也要重置表单
        } else {
          return false
        }
      })
    },
    handleCloseDialog() {
      // resetFields就是一个element-ui的一个坑，有两个作用
      // 1.表单重置，但是重置的值不是空值，而是第一次被赋予的初始值。
      // 第一次打开dialog，为dialogForm赋空值，后续才能重置为空值。
      // 这就是我们在新增修改打开弹出框操作的时候，调用resetDialogFrom清空数据的原因。
      // 2.清空校验结果
      this.$refs['dialogForm'].resetFields()
      this.dialogFormVisible = false
    },
    beforeDialogClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          this.$refs['dialogForm'].resetFields()
          done()
        })
        .catch((_) => {})
    },
    validateSelectTree() {},
    handleTreeSelected(value) {
      this.dialogForm.orgPid = value
      this.$refs.dialogForm.validateField('orgPid')
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
