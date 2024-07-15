<template>
  <div>
    <base-header class="pb-6" type="">
      <div class="row align-items-center py-4">
        <div class="col-lg-7 col-7">
          <h6 class="h2 d-inline-block mb-0">Data Vendor</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item"><router-link to="/administrator/dashboard"><i class="fas fa-home"></i></router-link></li>
              <li class="breadcrumb-item"><router-link to="/administrator/dashboard">Administrator</router-link></li>
              <li class="breadcrumb-item" aria-current="page">Users</li>
              <li class="breadcrumb-item" aria-current="page">Calon Nasabah</li>
            </ol>
          </nav>
        </div>
        <div class="col-lg-5 pt-2 text-right">
            <router-link to="" class="btn btn-sm btn-info">
              <i class="ni ni-calendar-grid-58" aria-hidden="true"></i>
              <span class="hidden-sm-down">Tanggal</span>
            </router-link>
            <router-link to="" class="btn btn-sm btn-warning">
              <i class="ni ni-cloud-download-95" aria-hidden="true"></i>
              <span class="hidden-sm-down">Download Excel</span>
            </router-link>
            <router-link to="" class="btn btn-sm btn-success">
              <i class="fa fa-edit" aria-hidden="true"></i>
              <span class="hidden-sm-down">Tambah User</span>
            </router-link>
        </div>
      </div>


    </base-header>

    <!--Charts-->
    <div class="container-fluid mt--6">

      <div>
        <card class="no-border-card" body-classes="px-0 pb-1" footer-classes="pb-2">
          <!-- <template slot="header">
            <h3 class="mb-0">Paginated tables</h3>
            <p class="text-sm mb-0">
              This is a client side example of paginated tables using element-ui tables.
            </p>
          </template> -->
          <div>
            <div class="row-12 d-flex justify-content-center justify-content-sm-between flex-wrap">
              <div class="col-2">
                <el-select
                  class="select-primary pagination-select"
                  v-model="pagination.perPage"
                  placeholder="Per page"
                >
                  <el-option
                    class="select-primary"
                    v-for="item in pagination.perPageOptions"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="col-4">
                <div>
                  <base-input v-model="searchQuery"
                              prepend-icon="fas fa-search"
                              placeholder="Search...">
                  </base-input>
                </div>
              </div>
            </div>
            <el-table :data="queriedData"
                      row-key="id"
                      header-row-class-name="thead-light"
                      @sort-change="sortChange"
                      @selection-change="selectionChange"
                      class="table-responsive table-flush">
              <!-- <el-table-column
                v-for="column in tableColumns"
                :key="column.label"
                v-bind="column"
              >
              </el-table-column> -->
              <el-table-column label="No."
                             min-width="100px"
                             sortable
                             prop="id">
                <template v-slot="{row}">
                    {{row.id}}
                </template>
              </el-table-column>
              <el-table-column label="Nama Perusahaan"
                             min-width="300px"
                             prop="name"
                             sortable>
                <template v-slot="{row}">
                  <router-link :to="{ name: 'details', params: { id: row.id }}">{{row.name}}</router-link>
                  <!-- <a v-bind:href="'/administrator/requests/'+ row.id +'/detail'">
                      {{row.name}}
                  </a> -->
                </template>
              </el-table-column>
              <el-table-column label="Nama PIC"
                             min-width="220px"
                             prop="position"
                             sortable>
                <template v-slot="{row}">
                    {{row.position}}
                </template>
              </el-table-column>
              <el-table-column label="Email"
                             min-width="220px"
                             prop="position"
                             sortable>
                <template v-slot="{row}">
                    {{row.position}}
                </template>
              </el-table-column>
              <el-table-column label="No HP"
                             min-width="220px"
                             prop="position"
                             sortable>
                <template v-slot="{row}">
                    {{row.position}}
                </template>
              </el-table-column>
              <el-table-column label="Status"
                             min-width="140px"
                             prop="salary"
                             sortable>
                <template v-slot="{row}">
                    <badge rounded type="default">
                        Accept
                    </badge>
                </template>
              </el-table-column>
              <el-table-column label="Dibuat Pada"
                             min-width="160px"
                             prop="created-at"
                             sortable>
                <template v-slot="{row}">
                        {{row.created-at}}
                </template>
              </el-table-column>
              <el-table-column prop="id" min-width="150px" align="right" label="Opsi">
                <div slot-scope="{$index, row}" class="d-flex">
                  <el-tooltip content="Edit" placement="top">
                  <base-button
                    @click.native="handleLike($index, row)"
                    class="like btn-link text-white"
                    type="info"
                    size="sm"
                    icon
                  >
                    <i class="text-white fa fa-edit"></i>
                  </base-button>
                  </el-tooltip>
                  <!-- <base-button
                    @click.native="handleEdit($index, row)"
                    class="edit"
                    type="warning"
                    size="sm"
                    icon
                  >
                    <i class="text-white ni ni-ruler-pencil"></i>
                  </base-button> -->
                  <el-tooltip content="Change to Waiting" placement="top">
                  <base-button
                    @click.native="handleDelete($index, row)"
                    class="remove btn-link text-white"
                    type="warning"
                    size="sm"
                    icon
                  >
                    <i class="text-white fa fa-ban"></i>
                  </base-button>
                  </el-tooltip>
                </div>
              </el-table-column>
            </el-table>
          </div>
          <div
            slot="footer"
            class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
          >
            <div class="">
              <p class="card-category">
                Showing {{ from + 1 }} to {{ to }} of {{ total }} entries

                <span v-if="selectedRows.length">
                  &nbsp; &nbsp; {{selectedRows.length}} rows selected
                </span>
              </p>

            </div>
            <base-pagination
              class="pagination-no-border"
              v-model="pagination.currentPage"
              :per-page="pagination.perPage"
              :total="total"
            >
            </base-pagination>
          </div>
        </card>
      </div>

    </div>

  </div>
</template>
<script>
  // Components
  import { Table, TableColumn, Select, Option } from 'element-ui';
  import RouteBreadCrumb from '@/components/Breadcrumb/RouteBreadcrumb'
  import { BasePagination } from '@/components';
  import clientPaginationMixin from '@/views/Tables/PaginatedTables/clientPaginationMixin'
  import swal from 'sweetalert2';
  import users from '@/views/Tables/users2';

 export default {
  mixins: [clientPaginationMixin],
  components: {
    BasePagination,
    RouteBreadCrumb,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  data() {
    return {
      propsToSearch: ['id', 'name', 'email', 'age'],
      tableData: users,
      selectedRows: []
    };
  },
  methods: {
    handleLike(index, row) {
      swal({
        title: `You liked ${row.name}`,
        buttonsStyling: false,
        type: 'success',
        confirmButtonClass: 'btn btn-success btn-fill'
      });
    },
    handleEdit(index, row) {
      swal({
        title: `You want to edit ${row.name}`,
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-info btn-fill'
      });
    },
    handleDelete(index, row) {
      swal({
        title: 'Are you sure?',
        text: `You won't be able to revert this!`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: 'btn btn-success btn-fill',
        cancelButtonClass: 'btn btn-danger btn-fill',
        confirmButtonText: 'Yes, delete it!',
        buttonsStyling: false
      }).then(result => {
        if (result.value) {
          this.deleteRow(row);
          swal({
            title: 'Deleted!',
            text: `You deleted ${row.name}`,
            type: 'success',
            confirmButtonClass: 'btn btn-success btn-fill',
            buttonsStyling: false
          });
        }
      });
    },
    deleteRow(row) {
      let indexToDelete = this.tableData.findIndex(
        tableRow => tableRow.id === row.id
      );
      if (indexToDelete >= 0) {
        this.tableData.splice(indexToDelete, 1);
      }
    },
    selectionChange(selectedRows) {
      this.selectedRows = selectedRows
    }
  }
};
</script>
<style>
  .no-border-card .card-footer{
    border-top: 0;
  }
</style>

