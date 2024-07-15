<template>
  <div>
    <base-header type>
      <div class="row align-items-center py-4">
        <div class="col-lg-12">
          <h6 class="h2 d-inline-block mb-0">AXI - Edit Pendaftaran AXI</h6>
        </div>
      </div>
    </base-header>

    <base-header class="pb-6" type>
      <div class="row align-items-center pb-4">
        <div class="col-lg-6">
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item">
                <router-link to="/administrator/dashboard">
                  <i class="fas fa-home" /> Administrator
                </router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">AXI</li>
              <li class="breadcrumb-item active" aria-current="page">
                Pendaftaran AXI
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Edit Pendaftaran AXI
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div class="pt-2">
        <button @click="$router.go(-1)" class="btn btn-sm btn-primary">
          <i class="ni ni-bold-left" aria-hidden="true"></i>
          <span class="hidden-sm-down">Kembali</span>
        </button>
      </div>
    </base-header>

    <div key="1" v-if="isBusy" class="text-center pb-5" style="display: flex; justify-content: center;">
      <br />
        <half-circle-spinner
          :animation-duration="1000"
          :size="60"
          color="#ff1d5e"
        />
    </div>
    <div key="2" v-if="isError" class="text-center p-5">
        <img
          alt="Error Image"
          src="/images/undraw_cancel_u1it.svg"
          height="300px"
          class="img-responsive"
        />
      <br />
      <div style="display: flex; margin-top: 20px !important; justify-content: center;">
        <h1>Error, silahkan coba lagi.</h1>
      </div>
    </div>

    <div key="4" v-if="!isBusy && !isError" class="container-fluid mt--6">
      <div class="row">
        <div class="col-md-7">
          <b-card>
            <ValidationObserver ref="formObserver">
              <form @submit.prevent="submit">
                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group">
                      <ValidationProvider
                        :rules="'required'"
                        v-slot="{ errors }"
                        name="Jenis AXI"
                      >
                        <label
                          for="jenis_axi"
                          :class="[
                            'form-control-label',
                            errors.length > 0 ? 'text-danger' : ''
                          ]"
                        >
                          Jenis AXI
                          <span class="text-danger">*</span>
                        </label>
                        <el-select
                          class="select-danger"                          
                          @change="setJenisAxi"
                          placeholder="Pilih Jenis AXI"
                          v-model="form.jenis_axi"
                        >
                          <el-option
                            v-for="option in listJenisAxi"
                            class="select-danger"
                            :value="option.value"
                            :label="option.label"
                            :key="option.label"
                          ></el-option>
                        </el-select>
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>

                    <div class="form-group">
                      <ValidationProvider
                        :rules="'required'"
                        v-slot="{ errors }"
                        name="Kategori"
                      >
                        <label
                          for="tipe_npwp"
                          :class="[
                            'form-control-label',
                            errors.length > 0 ? 'text-danger' : ''
                          ]"
                        >
                          Kategori
                          <span class="text-danger">*</span>
                        </label>

                        <select
                          :class="[
                            'form-control',
                            errors.length > 0 ? 'is-invalid' : ''
                          ]"
                          name="tipe_npwp"
                          id="tipe_npwp"
                          v-model="form.tipe_npwp"
                          :disabled="form.jenis_axi === 3">
                          <option value="1">Perorangan</option>
                          <option value="2">Badan</option>
                        </select>
                        
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>

                    <div class="form-group" v-if="this.form.jenis_axi === 3">
                      <ValidationProvider 
                        :rules="'required'"
                        v-slot="{ errors }"
                        name="Jenis Karyawan"
                      >
                        <label
                          for="jenis_karyawan"
                          :class="[
                            'form-control-label',
                            errors.length > 0 ? 'text-danger' : ''
                          ]"
                        >
                          Jenis Karyawan
                          <span class="text-danger">*</span>
                        </label>
                        <el-select
                          class="select-danger"
                          placeholder="Pilih Jenis Karyawan"
                          v-model="form.jenis_karyawan"
                        >
                          <el-option
                            v-for="option in listJenisKaryawan"
                            class="select-danger"
                            :value="option.value"
                            :label="option.label"
                            :key="option.value"
                          ></el-option>
                        </el-select>
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>

                    

                    <div class="form-group" v-if="this.form.tipe_npwp === '2'">
                      <ValidationProvider 
                        :rules="'required'"
                        v-slot="{ errors }"
                        name="Jenis Badan Usaha"
                      >
                        <label
                          for="jenis_usaha"
                          :class="[
                            'form-control-label',
                            errors.length > 0 ? 'text-danger' : ''
                          ]"
                        >
                          Jenis Badan Usaha
                          <span class="text-danger">*</span>
                        </label>
                        <el-select
                          class="select-danger"
                          placeholder="Pilih Jenis Usaha"
                          v-model="form.legal_form"
                        >
                          <el-option
                            v-for="option in listLegalForm"
                            class="select-danger"
                            :value="option.value"
                            :label="option.label"
                            :key="option.value"
                          ></el-option>
                        </el-select>
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>

                    <div class="form-group">
                      <ValidationProvider
                        :rules="'required'"
                        v-slot="{ errors }"
                        name="Area Adira Terdaftar"
                      >
                        <label
                          for="area_id"
                          :class="[
                            'form-control-label',
                            errors.length > 0 ? 'text-danger' : ''
                          ]"
                        >
                          Area Adira Terdaftar
                          <span class="text-danger">*</span>
                        </label>
                        <el-select
                          class="select-danger"
                          placeholder="Pilih Area"
                          v-model="form.area_id"
                          @change="setAreaId"
                          clearable
                        >
                          <el-option
                            v-for="option in listAreas"
                            class="select-danger"
                            :value="option.value"
                            :label="option.label"
                            :key="option.value"
                          ></el-option>
                        </el-select>
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>

                    <div class="form-group">
                      <ValidationProvider
                        :rules="'required'"
                        v-slot="{ errors }"
                        name="Cabang"
                      >
                        <el-select
                          class="select-danger"
                          placeholder="Pilih Cabang"
                          v-model="form.cabang_daftar"
                          filterable
                          :disabled="form.area_id == ''"
                          @change="setCRHName"
                        >
                          <el-option
                            v-for="option in listBranches"
                            class="select-danger"
                            :value="option.value"
                            :label="option.label"
                            :key="option.value"
                          ></el-option>
                        </el-select>
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>

                    <div class="form-group" v-if="this.form.jenis_axi !== 3">
                      <ValidationProvider
                        :rules="{
                          numeric: true
                        }"
                        v-slot="{ errors }"
                        name="Refferal AXI"
                      >
                        <label
                          for="axi_id_reff"
                          :class="[
                            'form-control-label',
                            errors.length > 0 ? 'text-danger' : ''
                          ]"
                          >Refferal AXI</label
                        >
                        <div class="input-group">
                          <input
                            type="text"
                            :class="[
                              'form-control',
                              errors.length > 0 ? 'is-invalid' : ''
                            ]"
                            id="axi_id_reff"
                            name="axi_id_reff"
                            placeholder
                            v-model="form.axi_id_reff"
                            @input="changeAxiReff"
                          />
                          <div class="input-group-append">
                            <!-- <b-overlay
                              :show="isBusyRefferal"
                              rounded
                              opacity="0.6"
                              spinner-small
                              spinner-variant="primary"
                              class="d-inline-block"
                            > -->
                            <b-button
                              variant="primary"
                              disabled
                              v-if="isBusyRefferal"
                            >
                              <b-spinner small type="grow"></b-spinner>
                              Loading...
                            </b-button>
                            <button
                              v-else
                              class="input-group-text btn btn-orange btn-block semibold m-b-10"
                              @click="checkRefferal"
                              :disabled="isBusyRefferal || !form.axi_id_reff"
                            >
                              Check
                            </button>
                            <!-- </b-overlay> -->
                          </div>
                        </div>
                        <small
                          v-if="isValidAxiReff"
                          :class="[
                            isValidAxiReff.includes('Nomor AXI')
                              ? 'text-danger'
                              : 'text-success'
                          ]"
                          >{{ isValidAxiReff }}</small
                        >
                        <small class="text-danger" v-else>{{
                          errors[0]
                        }}</small>
                      </ValidationProvider>
                    </div>

                    <div class="form-group">
                      <ValidationProvider
                        :rules="{
                          required: true,
                          regex: /^[a-z.'/ A-Z]+$/
                        }"
                        v-slot="{ errors }"
                        name="Nama AXI"
                      >
                        <label
                          for="nama"
                          :class="[
                            'form-control-label',
                            errors.length > 0 ? 'text-danger' : ''
                          ]"
                        >
                          Nama AXI
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          :class="[
                            'form-control',
                            errors.length > 0 ? 'is-invalid' : ''
                          ]"
                          id="nama"
                          name="nama"
                          placeholder
                          v-model="form.nama"
                        />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>

                    <div class="form-group m-b-25">
                      <ValidationProvider
                        :rules="{
                          required: true,
                          digits: 16,
                          regex: /^(?!0)([0-9]{12})(?=[0-9]{4})(?!(0{4})).{4}$/
                        }"
                        v-slot="{ errors }"
                        name="No ktp"
                      >
                        <label
                          for="no_ktp"
                          :class="[
                            'form-control-label',
                            errors.length > 0 ? 'text-danger' : ''
                          ]"
                        >
                          No KTP
                          <span class="text-danger">*</span>
                        </label>
                        <div class="input-group">
                          <input
                            type="text"
                            :class="[
                              'form-control',
                              errors.length > 0 ? 'is-invalid' : ''
                            ]"
                            id="no_ktp"
                            name="no_ktp"
                            placeholder
                            v-model="form.no_ktp"
                            maxlength="16"
                            @input="changeNoKtp"
                          />
                          <div class="input-group-append">
                            <!-- <b-overlay
                              :show="busy"
                              rounded
                              opacity="0.6"
                              spinner-small
                              spinner-variant="primary"
                              class="d-inline-block"
                            > -->
                            <a
                              class="input-group-text btn btn-orange btn-block semibold m-b-10"
                              @click="checkKTP"
                              >Check</a
                            >
                            <!-- </b-overlay> -->
                          </div>
                        </div>
                        <small
                          v-if="form.no_ktp != '' && isKtpValid"
                          :class="[
                            isKtpValid.includes('!')
                              ? 'text-danger'
                              : 'text-success'
                          ]"
                          >{{ isKtpValid }}</small
                        >
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>

                    <div class="form-group">
                      <ValidationProvider
                        :rules="'required'"
                        v-slot="{ errors }"
                        name="Tanggal lahir"
                      >
                        <label for="tanggal_lahir">
                          Tanggal Lahir
                          <span class="text-danger">*</span>
                        </label>
                        <base-input
                          addon-left-icon="ni ni-calendar-grid-58"
                          :class="[errors.length > 0 ? 'is-invalid' : '']"
                          id="tanggal_lahir"
                          key="tanggal_lahir"
                        >
                          <flat-picker
                            :config="{ allowInput: true }"
                            v-model="form.tanggal_lahir"
                            class="form-control datepicker"
                          ></flat-picker>
                        </base-input>
                        <!-- <input
                      data-provide="datepicker"
                      type="date"
                      :class="['form-control', errors.length > 0 ? 'is-invalid' : '']"
                      id="tanggal_lahir"
                      name="tanggal_lahir"
                      placeholder="DD/MM/YYYY"
                      v-model="form.tanggal_lahir"
                      key="tanggal_lahir"
                        />-->
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>

                    <div
                      id="form_kota_lahir"
                      key="1"
                      v-if="this.form.tipe_npwp === '2'"
                    >
                      <div class="form-group">
                        <ValidationProvider
                          :rules="'required'"
                          v-slot="{ errors }"
                          name="Tempat lahir"
                        >
                          <label
                            for="kota_lahir"
                            :class="[
                              'form-control-label',
                              errors.length > 0 ? 'text-danger' : ''
                            ]"
                          >
                            Tempat Lahir
                            <span class="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            :class="[
                              'form-control',
                              errors.length > 0 ? 'is-invalid' : ''
                            ]"
                            id="kota_lahir"
                            name="kota_lahir"
                            placeholder
                            v-model="form.kota_lahir"
                            key="kota_lahir"
                          />
                          <span class="text-danger">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                    </div>

                    <div
                      class="form-group"
                      key="2"
                      v-if="this.form.tipe_npwp === '1'"
                    >
                      <ValidationProvider
                        :rules="'required'"
                        v-slot="{ errors }"
                        name="Jenis Kelamin"
                      >
                        <label
                          for="jenis_kelamin"
                          :class="[
                            'form-control-label',
                            errors.length > 0 ? 'text-danger' : ''
                          ]"
                        >
                          Jenis Kelamin
                          <span class="text-danger">*</span>
                        </label>
                        <el-select
                          class="select-danger"
                          placeholder="Pilih Jenis Kelamin"
                          v-model="form.jenis_kelamin"
                        >
                          <el-option
                            v-for="option in listJenisKelamin"
                            class="select-danger"
                            :value="option.value"
                            :label="option.label"
                            :key="option.label"
                          ></el-option>
                        </el-select>
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>

                    <div
                      id="form_agama"
                      key="3"
                      v-if="this.form.tipe_npwp === '1'"
                    >
                      <div class="form-group">
                        <ValidationProvider
                          :rules="'required'"
                          v-slot="{ errors }"
                          name="Agama"
                        >
                          <label
                            for="agama"
                            :class="[
                              'form-control-label',
                              errors.length > 0 ? 'text-danger' : ''
                            ]"
                          >
                            Agama
                            <span class="text-danger">*</span>
                          </label>
                          <el-select
                            class="select-danger"
                            placeholder="Pilih Agama"
                            v-model="form.agama"
                          >
                            <el-option
                              v-for="option in listAgama"
                              class="select-danger"
                              :value="option.value"
                              :label="option.label"
                              :key="option.label"
                            ></el-option>
                          </el-select>
                          <span class="text-danger">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                    </div>

                    <template
                      id="form_perkawinan"
                      v-if="this.form.tipe_npwp === '1'"
                    >
                      <div class="form-group">
                        <ValidationProvider
                          :rules="'required'"
                          v-slot="{ errors }"
                          name="Status perkawinan"
                        >
                          <label
                            for="status_perkawinan"
                            :class="[
                              'form-control-label',
                              errors.length > 0 ? 'text-danger' : ''
                            ]"
                          >
                            Status Perkawinan
                            <span class="text-danger">*</span>
                          </label>
                          <el-select
                            class="select-danger"
                            placeholder="Pilih Status Perkawinan"
                            v-model="form.status_perkawinan"
                          >
                            <el-option
                              v-for="option in listStatusPernikahan"
                              class="select-danger"
                              :value="option.value"
                              :label="option.label"
                              :key="option.value"
                            ></el-option>
                          </el-select>
                          <span class="text-danger">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                    </template>

                    <div
                      id="form_pasangan"
                      v-if="
                        form.status_perkawinan &&
                          form.status_perkawinan === 1
                      "
                    >
                      <div class="form-group">
                        <ValidationProvider
                          :rules="{
                            required: true,
                            regex: /^[a-z.'/ A-Z]+$/
                          }"
                          v-slot="{ errors }"
                          name="Nama pasangan"
                        >
                          <label
                            for="name_pasangan"
                            :class="[
                              'form-control-label',
                              errors.length > 0 ? 'text-danger' : ''
                            ]"
                            >Nama Pasangan
                            <span class="text-danger">*</span>
                            </label>
                          <input
                            type="text"
                            :class="[
                              'form-control',
                              errors.length > 0 ? 'is-invalid' : ''
                            ]"
                            id="name_pasangan"
                            name="name_pasangan"
                            placeholder
                            v-model="form.nama_pasangan"
                          />
                          <span class="text-danger">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>

                      <div class="form-group m-b-25">
                      <ValidationProvider
                        :rules="{
                          required: true,
                          digits: 16,
                          regex: /^(?!0)([0-9]{12})(?=[0-9]{4})(?!(0{4})).{4}$/
                        }"
                        v-slot="{ errors }"
                        name="No ktp pasangan"
                      >
                        <label
                          for="no_ktp_pasangan"
                          :class="[
                            'form-control-label',
                            errors.length > 0 ? 'text-danger' : ''
                          ]"
                        >
                          No KTP Pasangan
                          <span class="text-danger">*</span>
                        </label>
                        <div class="input-group">
                          <input
                            type="text"
                            :class="[
                              'form-control',
                              errors.length > 0 ? 'is-invalid' : ''
                            ]"
                            id="no_ktp_pasangan"
                            name="no_ktp_pasangan"
                            placeholder
                            v-model="form.no_ktp_pasangan"
                            maxlength="16"
                            @input="changeNoKtpPasangan"
                          />
                          <div class="input-group-append">
                            <!-- <b-overlay
                              :show="busy"
                              rounded
                              opacity="0.6"
                              spinner-small
                              spinner-variant="primary"
                              class="d-inline-block"
                            > -->
                            <a
                              class="input-group-text btn btn-orange btn-block semibold m-b-10"
                              @click="checkKTPPasangan"
                              >Check</a
                            >
                            <!-- </b-overlay> -->
                          </div>
                        </div>
                        <small
                          v-if="form.no_ktp_pasangan != '' && isKtpPasanganValid"
                          :class="[
                            isKtpPasanganValid.includes('!')
                              ? 'text-danger'
                              : 'text-success'
                          ]"
                          >{{ isKtpPasanganValid }}</small
                        >
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                    </div>

                    <div class="form-group">
                      <ValidationProvider
                        :rules="{
                          required: true,
                          max: 60,
                          regex: /^[a-z.'/ A-Z0-9-]+$/
                        }"
                        v-slot="{ errors }"
                        name="Alamat KTP"
                      >
                        <label
                          for="alamat_ktp"
                          :class="[
                            'form-control-label',
                            errors.length > 0 ? 'text-danger' : ''
                          ]"
                        >
                          Alamat KTP
                          <span class="text-danger">*</span>
                        </label>
                        <textarea
                          :class="[
                            'form-control',
                            errors.length > 0 ? 'is-invalid' : ''
                          ]"
                          id="alamat_ktp"
                          name="alamat_ktp"
                          v-model="form.alamat_ktp"
                          maxlength="61"
                        />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>

                    <div class="form-group">
                      <ValidationProvider
                        :rules="{
                          required: true,
                          numeric: true,
                          digits: 3
                        }"
                        v-slot="{ errors }"
                        name="RT KTP"
                      >
                        <label
                          for="rt"
                          :class="[
                            'form-control-label',
                            errors.length > 0 ? 'text-danger' : ''
                          ]"
                        >
                          RT KTP
                          <span class="text-danger">*</span>
                        </label>
                        <div>
                          <input
                            type="text"
                            :class="[
                              'form-control',
                              errors.length > 0 ? 'is-invalid' : '',
                              'small-field'
                            ]"
                            id="rt"
                            name="rt"
                            placeholder
                            v-model="form.rt"
                            maxlength="3"
                          />
                          <span class="text-danger">{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>

                      <ValidationProvider
                        :rules="{
                          required: true,
                          numeric: true,
                          digits: 3
                        }"
                        v-slot="{ errors }"
                        name="RW KTP"
                      >
                        <label
                          for="rt"
                          :class="[
                            'form-control-label',
                            errors.length > 0 ? 'text-danger' : ''
                          ]"
                        >
                          RW KTP
                          <span class="text-danger">*</span>
                        </label>
                        <div>
                          <input
                            type="text"
                            :class="[
                              'form-control',
                              errors.length > 0 ? 'is-invalid' : '',
                              'small-field'
                            ]"
                            id="rw"
                            name="rw"
                            placeholder
                            v-model="form.rw"
                            maxlength="3"
                          />
                          <span class="text-danger">{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </div>

                    <div class="form-group">
                      <ValidationProvider
                        :rules="'required'"
                        v-slot="{ errors }"
                        name="Provinsi"
                      >
                        <label
                          for="provinsi"
                          :class="[
                            'form-control-label',
                            errors.length > 0 ? 'text-danger' : ''
                          ]"
                        >
                          Provinsi
                          <span class="text-danger">*</span>
                        </label>
                        <el-select
                          class="select-danger"
                          placeholder="Pilih Provinsi"
                          v-model="form.provinsi_id"
                          @change="setProvinsi"
                        >
                          <el-option
                            v-for="option in listProvinsi"
                            class="select-danger"
                            :value="option.value"
                            :label="option.label"
                            :key="option.label"
                          ></el-option>
                        </el-select>
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>

                    <div class="form-group">
                      <ValidationProvider
                        :rules="'required'"
                        v-slot="{ errors }"
                        name="Kota Kabupaten"
                      >
                        <label
                          for="kota"
                          :class="[
                            'form-control-label',
                            errors.length > 0 ? 'text-danger' : ''
                          ]"
                        >
                          Kota Kabupaten
                          <span class="text-danger">*</span>
                        </label>
                        <el-select
                          class="select-danger"
                          placeholder="Pilih Kota"
                          v-model="form.kota_id"
                          @change="setKota"
                        >
                          <el-option
                            v-for="option in listKota"
                            class="select-danger"
                            :value="option.value"
                            :label="option.label"
                            :key="option.label"
                          ></el-option>
                        </el-select>
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>

                    <div class="form-group">
                      <ValidationProvider
                        :rules="'required'"
                        v-slot="{ errors }"
                        name="Kecamatan"
                      >
                        <label
                          for="kecamatan"
                          :class="[
                            'form-control-label',
                            errors.length > 0 ? 'text-danger' : ''
                          ]"
                        >
                          Kecamatan
                          <span class="text-danger">*</span>
                        </label>
                        <el-select
                          class="select-danger"
                          placeholder="Pilih Kecamatan"
                          v-model="form.kecamatan_id"
                          @change="setKecamatan"
                        >
                          <el-option
                            v-for="option in listKecamatan"
                            class="select-danger"
                            :value="option.value"
                            :label="option.label"
                            :key="option.label"
                          ></el-option>
                        </el-select>
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>

                    <div class="form-group">
                      <ValidationProvider
                        :rules="'required'"
                        v-slot="{ errors }"
                        name="Kelurahan"
                      >
                        <label
                          for="kelurahan"
                          :class="[
                            'form-control-label',
                            errors.length > 0 ? 'text-danger' : ''
                          ]"
                        >
                          Kelurahan
                          <span class="text-danger">*</span>
                        </label>
                        <el-select
                          class="select-danger"
                          placeholder="Pilih Kelurahan"
                          v-model="form.kelurahan_id"
                          @change="setKodePos"
                        >
                          <el-option
                            v-for="option in listKelurahan"
                            class="select-danger"
                            :value="option.value"
                            :label="option.label"
                            :key="option.value"
                          ></el-option>
                        </el-select>
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>

                    <div class="form-group">
                      <ValidationProvider
                        :rules="{
                          required: true,
                          numeric: true,
                          digits: 5
                        }"
                        v-slot="{ errors }"
                        name="Kode Pos"
                      >
                        <label
                          for="zipcode"
                          :class="[
                            'form-control-label',
                            errors.length > 0 ? 'text-danger' : ''
                          ]"
                        >
                          Kode Pos
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          :class="[
                            'form-control',
                            errors.length > 0 ? 'is-invalid' : ''
                          ]"
                          id="zipcode"
                          name="zipcode"
                          placeholder
                          v-model="form.zipcode"
                          maxlength="5"
                        />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>

                    <div class="form-group">
                      <ValidationProvider
                        :rules="{
                          required: true,
                          regex: /^[\w\.-]+@([\w\-]+\.)+[\w]{2,4}$/
                        }"
                        v-slot="{ errors, failedRules }"
                        name="Email"
                      >
                        <label
                          for="email"
                          :class="[
                            'form-control-label',
                            errors.length > 0 ? 'text-danger' : ''
                          ]"
                        >
                          Email
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          :class="[
                            'form-control',
                            errors.length > 0 ? 'is-invalid' : ''
                          ]"
                          id="email"
                          name="email"
                          placeholder
                          v-model="form.email"
                        />
                        <span class="text-danger" v-if="failedRules.regex"
                          >Masukan alamat email dengan benar (Contoh:
                          budi.susanto@gmail.com)</span
                        >
                        <span class="text-danger" v-else>{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>

                    <div class="form-group">
                      <ValidationProvider
                        :rules="{
                          required: true,
                          numeric: true,
                          min: 9,
                          max: 16,
                          regex: /^62[0-9]+$/
                        }"
                        v-slot="{ errors, failedRules }"
                        name="No. HP"
                      >
                        <label
                          for="no_hp"
                          :class="[
                            'form-control-label',
                            errors.length > 0 ? 'text-danger' : ''
                          ]"
                        >
                          No. HP
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          :class="[
                            'form-control',
                            errors.length > 0 ? 'is-invalid' : ''
                          ]"
                          id="no_hp"
                          name="no_hp"
                          placeholder
                          v-model="form.no_hp"
                          maxlength="16"
                        />
                        <span class="text-danger" v-if="failedRules.regex"
                          >Format No. HP salah (Contoh: 6281234567890)</span
                        >
                        <span class="text-danger" v-else>{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>

                    <!-- <div class="form-group">
                      <ValidationProvider
                        :rules="{
                        required: true,
                        regex: /^[a-z.'/ A-Z]+$/
                      }"
                        v-slot="{ errors }"
                        name="Nama Ibu Kandung"
                      >
                        <label
                          for="nama_ibu_kandung"
                          :class="['form-control-label', errors.length > 0 ? 'text-danger' : '']"
                        >
                          Nama Ibu Kandung
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          :class="['form-control', errors.length > 0 ? 'is-invalid' : '']"
                          id="nama_ibu_kandung"
                          name="nama_ibu_kandung"
                          placeholder
                          v-model="form.nama_ibu_kandung"
                        />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>-->

                    <div class="form-group">
                      <ValidationProvider
                        :rules="'required'"
                        v-slot="{ errors }"
                        name="Nama Bank"
                      >
                        <label
                          for="bank"
                          :class="[
                            'form-control-label',
                            errors.length > 0 ? 'text-danger' : ''
                          ]"
                        >
                          Nama Bank
                          <span class="text-danger">*</span>
                        </label>
                        <el-select
                          class="select-danger"
                          placeholder="Pilih Bank"
                          v-model="form.bank_id"
                        >
                          <el-option
                            v-for="option in listBanks"
                            class="select-danger"
                            :value="option.value"
                            :label="option.label"
                            :key="option.value"
                          ></el-option>
                        </el-select>
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>

                    <div class="form-group">
                      <ValidationProvider
                        :rules="{
                          required: true,
                          regex: /^[a-z.'/ A-Z]+$/
                        }"
                        v-slot="{ errors }"
                        name="Cabang Bank"
                      >
                        <label
                          for="cabang_bank"
                          :class="[
                            'form-control-label',
                            errors.length > 0 ? 'text-danger' : ''
                          ]"
                        >
                          Cabang Bank
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          :class="[
                            'form-control',
                            errors.length > 0 ? 'is-invalid' : ''
                          ]"
                          id="cabang_bank"
                          name="cabang_bank"
                          placeholder
                          v-model="form.cabang_bank"
                        />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>

                    <div class="form-group">
                      <ValidationProvider
                        :rules="{
                          required: true,
                          regex: /^[a-z.'/ A-Z]+$/
                        }"
                        v-slot="{ errors }"
                        name="A/N Rekening"
                      >
                        <label
                          for="an_rekening"
                          :class="[
                            'form-control-label',
                            errors.length > 0 ? 'text-danger' : ''
                          ]"
                        >
                          A/N Rekening
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          :class="[
                            'form-control',
                            errors.length > 0 ? 'is-invalid' : ''
                          ]"
                          id="an_rekening"
                          name="an_rekening"
                          placeholder
                          v-model="form.an_rekening"
                        />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>

                    <div class="form-group">
                      <ValidationProvider
                        :rules="{
                          required: true,
                          numeric: true,
                          min: 9
                        }"
                        v-slot="{ errors }"
                        name="No. Rekening"
                      >
                        <label
                          for="rekening"
                          :class="[
                            'form-control-label',
                            errors.length > 0 ? 'text-danger' : ''
                          ]"
                        >
                          No. Rekening
                          <span class="text-danger">*</span>
                        </label>
                        <div class="input-group">
                          <input
                            type="text"
                            :class="[
                              'form-control',
                              errors.length > 0 ? 'is-invalid' : ''
                            ]"
                            id="no_rekening"
                            name="no_rekening"
                            placeholder
                            v-model="form.no_rekening"
                          />
                          <div
                            class="input-group-append"
                            v-if="form.bank_id == '8' || form.bank_id == '4'"
                          >
                          </div>
                        </div>
                        <small
                          v-if="result != '' && form.no_rekening != ''"
                          :class="
                            result.data.header.srcMessage == 'Success' ||
                            result.data.header.srcMessage == 'OK'
                              ? 'text-success'
                              : 'text-danger'
                          "
                        >
                          <small>{{
                            result.data.header.srcMessage == "Success" ||
                            result.data.header.srcMessage == "OK"
                              ? "Data Bank Valid"
                              : "Data Bank Tidak Valid"
                          }}</small>
                          <small v-if="result.data.data.accountName">
                            <!-- {{`${result.data.data.accountName != form.an_rekening ? " Nama Tidak Sesuai" : "" }`}} -->
                            {{ ` a.n ${result.data.data.accountName}` }}
                          </small>
                        </small>
                        <small
                          v-else-if="form.bank_id == ''"
                          :class="
                            form.bank_id == '' ? 'text-danger' : 'text-success'
                          "
                          >*Pilih Nama Bank</small
                        >
                        <small
                          v-else-if="form.an_rekening == ''"
                          :class="
                            form.an_rekening == ''
                              ? 'text-danger'
                              : 'text-success'
                          "
                          >*masukan Nama Rekening</small
                        >
                        <small
                          v-else-if="form.no_rekening == ''"
                          :class="
                            form.no_rekening == ''
                              ? 'text-danger'
                              : 'text-success'
                          "
                          >*Masukkan Nomor Rekening</small
                        >
                        <small class="text-danger">{{ errors[0] }}</small>
                      </ValidationProvider>
                    </div>

                    <div class="form-group">
                      <ValidationProvider
                        :rules="{
                          required: true,
                          regex: /^[a-z.'/ A-Z]+$/
                        }"
                        v-slot="{ errors }"
                        name="Kota Bank"
                      >
                        <label
                          for="kota_bank"
                          :class="[
                            'form-control-label',
                            errors.length > 0 ? 'text-danger' : ''
                          ]"
                        >
                          Kota Bank
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          :class="[
                            'form-control',
                            errors.length > 0 ? 'is-invalid' : ''
                          ]"
                          id="kota_bank"
                          name="kota_bank"
                          placeholder
                          v-model="form.kota_bank"
                        />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>

                    <div class="form-group">
                      <ValidationProvider
                        :rules="'required'"
                        v-slot="{ errors }"
                        name="NPWP"
                      >
                        <label
                          for="npwp"
                          :class="[
                            'form-control-label',
                            errors.length > 0 ? 'text-danger' : ''
                          ]"
                        >
                          NPWP
                          <span class="text-danger">*</span>
                        </label>
                        <select
                          :class="[
                            'form-control',
                            errors.length > 0 ? 'is-invalid' : ''
                          ]"
                          name="npwp"
                          id="npwp"
                          v-model="form.npwp"
                        >
                          <option value="1">Ada</option>
                          <option value="2">Tidak ada</option>
                        </select>
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>

                    <div class="form-group" v-if="this.form.npwp === '1'">
                      <ValidationProvider
                        :rules="{
                          required: true,
                          numeric: true,
                          digits: 15
                        }"
                        v-slot="{ errors }"
                        name="No. NPWP"
                      >
                        <label
                          for="no_npwp"
                          :class="[
                            'form-control-label',
                            errors.length > 0 ? 'text-danger' : ''
                          ]"
                        >
                          No. NPWP
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          :class="[
                            'form-control',
                            errors.length > 0 ? 'is-invalid' : ''
                          ]"
                          id="no_npwp"
                          name="no_npwp"
                          v-model="form.no_npwp"
                          maxlength="15"
                        />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>

                    <div class="form-group" v-if="this.form.npwp === '1'">
                      <ValidationProvider
                        :rules="{
                          required: true,
                          regex: /^[a-z.'/ A-Z]+$/
                        }"
                        v-slot="{ errors }"
                        name="Nama NPWP"
                      >
                        <label
                          for="npwp"
                          :class="[
                            'form-control-label',
                            errors.length > 0 ? 'text-danger' : ''
                          ]"
                        >
                          Nama NPWP
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          :class="[
                            'form-control',
                            errors.length > 0 ? 'is-invalid' : ''
                          ]"
                          id="nama_npwp"
                          name="nama_npwp"
                          placeholder
                          v-model="form.nama_npwp"
                        />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>

                    <div class="form-group" v-if="this.form.npwp === '1'">
                      <ValidationProvider
                        :rules="'required'"
                        v-slot="{ errors }"
                        name="PKP Status"
                      >
                        <label
                          for="pkp"
                          :class="[
                            'form-control-label',
                            errors.length > 0 ? 'text-danger' : ''
                          ]"
                        >
                          PKP Status
                          <span class="text-danger">*</span>
                        </label>

                        <select
                          :class="[
                            'form-control',
                            errors.length > 0 ? 'is-invalid' : ''
                          ]"
                          name="pkp"
                          id="pkp"
                          v-model="form.pkp"
                        >
                          <option value="1">PKP</option>
                          <option value="2">Non PKP</option>
                        </select>
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>

                    <div class="form-group">
                      <ValidationProvider
                        :rules="'required'"
                        v-slot="{ errors }"
                        name="Status"
                      >
                        <label
                          for="jenis_usaha"
                          :class="[
                            'form-control-label',
                            errors.length > 0 ? 'text-danger' : ''
                          ]"
                        >
                          Status
                          <span class="text-danger">*</span>
                        </label>
                        <el-select
                          class="select-danger"
                          placeholder="Pilih Status"
                          v-model="form.status_registrasi"
                          clearable
                          :disabled="isDisableStatus"
                        >
                          <el-option
                            v-for="option in listStatus"
                            class="select-danger"
                            :value="option.value"
                            :label="option.label"
                            :key="option.label"
                          ></el-option>
                        </el-select>
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>

                    <div
                      class="form-group"
                      v-if="form.status_registrasi === 'SETUJU'"
                    >
                      <ValidationProvider
                        :rules="'required'"
                        v-slot="{ errors }"
                        name="CRH Name"
                      >
                        <label
                          for="nama_crh"
                          :class="[
                            'form-control-label',
                            errors.length > 0 ? 'text-danger' : ''
                          ]"
                        >
                          CRH Name
                          <span class="text-danger">*</span>
                        </label>
                        <el-select
                          class="select-danger"
                          placeholder="Pilih Nama CRH"
                          v-model="form.nama_crh"
                          @change="setCRH"
                          clearable
                        >
                          <el-option
                            v-for="option in listCRHName"
                            class="select-danger"
                            :value="option.value"
                            :label="option.label"
                            :key="option.value"
                          ></el-option>
                        </el-select>
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                    <div
                      class="form-group"
                      v-if="form.status_registrasi === 'SETUJU'"
                    >
                      <ValidationProvider
                        :rules="'required'"
                        v-slot="{ errors }"
                        name="CRH Email"
                      >
                        <label
                          for="email_crh"
                          :class="[
                            'form-control-label',
                            errors.length > 0 ? 'text-danger' : ''
                          ]"
                        >
                          CRH Email
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          :class="[
                            'form-control',
                            errors.length > 0 ? 'is-invalid' : ''
                          ]"
                          id="email_crh"
                          name="email_crh"
                          v-model="form.email_crh"
                          readonly
                        />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>

                    <br />
                    <div class="row">
                      <div class="col-sm-12">
                        <button
                          type="submit"
                          id="btnRegisterAxi"
                          class="btn btn-orange btn-block semibold m-b-10"
                        >
                          {{ isDisableStatus ? "Proses" : "Verifikasi" }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </ValidationObserver>
          </b-card>
        </div>
        <div class="col-md-5">
          <div>
            <div role="tablist">
              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-button
                    block
                    href="#"
                    v-b-toggle.accordion-1
                    variant="primary"
                    >Foto KTP</b-button
                  >
                </b-card-header>
                <b-collapse
                  id="accordion-1"
                  visible
                  accordion="my-accordion"
                  role="tabpanel"
                >
                <b-card-body>
                <div v-if="isBusyCompressKtp"><b-overlay :show="isBusyCompressKtp" rounded opacity="0.6">
                  <b-button variant="primary" disabled>
                    <b-spinner small type="grow"></b-spinner>
                   Loading...
                    </b-button>
                  </b-overlay>
               </div>
                  <div v-else>
                      <h5 v-if="fileSizeKtp !== null  && foto_ktp !== '/images/not-found.jpg'" class="center-text"><strong>Ukuran File: {{ isCompressButtonClickedKtp ? formatBytes(fileSizeKtp, 2) : formatBytes(fileSizeKtp, 2) }}</strong></h5>
                      <h5 v-else class="center-text"><strong>Tidak dapat mengambil ukuran file.</strong></h5>
                <b-button
                    @click="compressKTP"
                    :disabled="isBusyCompressKtp || fileSizeKtp <= 3145728"
                    block
                    href="#"
                    variant="warning">
                    Compress
                  </b-button>
              <b-card-img bottom :src="foto_ktp" alt="Foto KTP"></b-card-img>
                </div>
            </b-card-body>
                </b-collapse>
              </b-card>

              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-button
                    block
                    href="#"
                    v-b-toggle.accordion-2
                    variant="primary"
                    >Foto NPWP</b-button
                  >
                </b-card-header>
                <b-collapse
                  id="accordion-2"
                  accordion="my-accordion"
                  role="tabpanel"
                >
                <b-card-body>
                <div v-if="isBusyCompressNpwp"><b-overlay :show="isBusyCompressNpwp" rounded opacity="0.6">
                  <b-button variant="primary" disabled>
                    <b-spinner small type="grow"></b-spinner>
                   Loading...
                    </b-button>
                  </b-overlay>
               </div>
                  <div v-else>
                    <h5 v-if="fileSizeNpwp !== null  && foto_Npwp !== '/images/not-found.jpg'" class="center-text"><strong>Ukuran File: {{ isCompressButtonClickedNpwp ? formatBytes(fileSizeNpwp, 2) : formatBytes(fileSizeNpwp, 2) }}</strong></h5>
                      <h5 v-else class="center-text"><strong>Tidak dapat mengambil ukuran file.</strong></h5>
                <b-button
                    @click="compressNPWP"
                    :disabled="isBusyCompressNpwp || fileSizeNpwp <= 3145728"
                    block
                    href="#"
                    variant="warning">
                    Compress
                  </b-button>
              <b-card-img bottom :src="foto_npwp" alt="Foto NPWP"></b-card-img>
                </div>
            </b-card-body>
                </b-collapse>
              </b-card>

              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-button
                    block
                    href="#"
                    v-b-toggle.accordion-3
                    variant="primary"
                    >Foto Buku Rekening</b-button
                  >
                </b-card-header>
                <b-collapse
                  id="accordion-3"
                  accordion="my-accordion"
                  role="tabpanel"
                >
                <b-card-body>
                <div v-if="isBusyCompressRekening"><b-overlay :show="isBusyCompressRekening" rounded opacity="0.6">
                  <b-button variant="primary" disabled>
                    <b-spinner small type="grow"></b-spinner>
                   Loading...
                    </b-button>
                  </b-overlay>
               </div>
                  <div v-else>
                      <h5 v-if="fileSizeRekening !== null && foto_rekening !== '/images/not-found.jpg'" class="center-text"><strong>Ukuran File: {{ isCompressButtonClickedRekening ? formatBytes(fileSizeRekening, 2) : formatBytes(fileSizeRekening, 2) }}</strong></h5>
                      <h5 v-else class="center-text"><strong>Tidak dapat mengambil ukuran file.</strong></h5>
                <b-button
                    @click="compressRekening"
                    :disabled="isBusyCompressRekening || fileSizeRekening <= 3145728"
                    block
                    href="#"
                    variant="warning">
                    Compress
                  </b-button>
              <b-card-img bottom :src="foto_rekening" alt="Foto Buku Rekening"></b-card-img>
                </div>
            </b-card-body>
                </b-collapse>
              </b-card>
            </div>
            <!-- <b-card no-body>
              <b-tabs pills card vertical content-class="mt-3" >
                <b-tab no-body title="Foto KTP">
                  <b-card-img bottom :src="form.foto_ktp" alt="Foto KTP"></b-card-img>
                </b-tab>

                <b-tab no-body title="Foto NPWP">
                  <b-card-img bottom :src="form.foto_npwp" alt="Foto NPWP"></b-card-img>
                </b-tab>

                <b-tab no-body title="Foto Buku Rekening">
                  <b-card-img bottom :src="form.foto_rekening" alt="Foto Buku Rekening"></b-card-img>
                </b-tab>\
              </b-tabs>
            </b-card>-->
          </div>
        </div>
      </div>
    </div>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Silahkan masukkan alasan:"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form
        ref="formRevisi"
        @submit.stop.prevent="handleSubmit"
        v-if="this.form.status_registrasi === 'REVISI'"
      >
        <b-form-group
          label-for="revisi-list"
          invalid-feedback="Alasan harus diisi"
        >
          <b-form-checkbox-group
            id="revisi-list"
            v-model="alasan"
            :options="options"
            name="reason-revisi"
            :state="stateCheckbox"
            stacked
          >
            <!-- <b-form-valid-feedback :state="stateCheckbox">Thank you</b-form-valid-feedback> -->
          </b-form-checkbox-group>
          <b-form-invalid-feedback :state="stateCheckbox"
            >Mohon masukkan alasan</b-form-invalid-feedback
          >
        </b-form-group>
        <b-form-group
          :state="nameState"
          label-for="reject-list"
          invalid-feedback="Alasan harus diisi"
          v-if="alasan.includes('Lain - lain')"
        >
          <b-form-textarea
            id="textarea"
            :state="nameState"
            v-model="rejectNote"
            placeholder="Enter something..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-form-group>
      </form>
      <form ref="formReject" @submit.stop.prevent="handleSubmit" v-else>
        <b-form-group
          :state="nameState"
          label-for="reject-list"
          invalid-feedback="Alasan harus diisi"
        >
          <b-form-textarea
            id="textarea"
            :state="nameState"
            v-model="rejectNote"
            placeholder="Enter something..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';
import { Option, Select } from "element-ui";
import { HalfCircleSpinner } from "epic-spinners";
import "flatpickr/dist/flatpickr.css";
import moment from "moment";
import Swal from "sweetalert2";
import flatPicker from "vue-flatpickr-component";
import { mapActions, mapGetters } from "vuex";


export default {
  components: {
    [Select.name]: Select,
    [Option.name]: Option,
    HalfCircleSpinner,
    flatPicker
  },
  data() {
    return {
      isBusy: true,
      isError: false,
      isCheck: false,
      isCheckKtp: false,
      isCheckKtpPasangan: false,
      ischeckstatus:true,
      isCheckRefferal: false,
      isBusyRefferal: false,
      isBusyCompressKtp: false,
      isBusyCompressNpwp: false,
      isBusyCompressRekening: false,
      isCompressKTP: false,
      isCompressNPWP: false,
      isCompressRek: false,
      listJenisAxi: [],
      listJenisKelamin: [],
      listAgama: [],
      listStatusPernikahan: [],
      listLegalForm: [],
      listProvinsi: [],
      listKota: [],
      listKecamatan: [],
      listKelurahan: [],
      listBanks: [],
      listAreas: [],
      listBranches: [],
      listCRHName: [],
      listCRHEmail: [],
      listJenisKaryawan: [],
      listStatus: [
        { value: "PENGECEKAN", label: "Pengecekan" },
        { value: "SETUJU", label: "Setuju" },
        { value: "TOLAK", label: "Tolak" },
        { value: "REVISI", label: "Revisi" }
      ],
      listRevisi: [], // Must be an array reference!
      options: [
        {
          text: "Sudah terdaftar menjadi AXI",
          value: "Sudah terdaftar menjadi AXI"
        },
        {
          text: "Data KTP Tidak Sesuai",
          value: "Data KTP Tidak Sesuai"
        },
        { text: "Data NPWP Tidak Sesuai", value: "Data NPWP Tidak Sesuai" },
        {
          text: "Data Rekening Tidak Sesuai",
          value: "Data Rekening Tidak Sesuai"
        },
        { text: "Foto KTP Tidak Jelas", value: "Foto KTP Tidak Jelas" },
        { text: "Foto Selfie Tidak Jelas", value: "Foto Selfie Tidak Jelas" },
        { text: "Foto NPWP Tidak Jelas", value: "Foto NPWP Tidak Jelas" },
        {
          text: "Foto Buku Rekening Tidak Jelas",
          value: "Foto Buku Rekening Tidak Jelas"
        },
        {
          text: "Lain - lain",
          value: "Lain - lain"
        }
      ],
      rejectNote: "",
      areaId: "",
      provinsiId: "",
      kotaId: "",
      kecamatanId: "",
      isLoading: true,
      isShow: false,
      axiData: {},
      result: "",
      form: {
        jenis_axi: "",
        no_ktp: "",
        kota_lahir: "",
        tanggal_lahir: "",
        status_perkawinan: "",
        jenis_kelamin: "",
        agama: "",
        email: "",
        no_hp: "",
        nama_ibu_kandung: "",
        nama: "",
        npwp: "",
        no_npwp: "",
        nama_npwp: "",
        tipe_npwp: "",
        pkp: "",
        cabang_daftar: "",
        axi_id_reff: "",
        alamat_ktp: "",
        rt: "",
        rw: "",
        bank_id: "",
        no_rekening: "",
        an_rekening: "",
        cabang_bank: "",
        kota_bank: "",
        kelurahan_id: "",
        provinsi_id: "",
        kota_id: "",
        kecamatan_id: "",
        area_id: "",
        legal_form: "",
        agreement: false,
        zipcode: "",
        nama_pasangan: "",
        no_ktp_pasangan: "",
        status_registrasi: "",
        email_crh: "",
        nama_crh: "",
        jenis_karyawan: "",
      },
      foto_rekening: "",
      foto_ktp: "",
      foto_npwp: "",
      foto_selfie: "",
      axi_id: "",
      fileSizeKtp: null,
      fileSizeNpwp: null,
      fileSizeRekening: null,
      isCompressButtonClickedKtp: false,
      isCompressButtonClickedRekening: false, 
      isCompressButtonClickedNpwp: false,  
      alasan: [], // Must be an array reference!
      // link_revisi: `${process.env.VUE_APP_URL_REVISI}/verifikasi-data`,
      nameState: "",
      busy: false,
      isKtpValid: "",
      isKtpPasanganValid: "",
      isDisableStatus: false,
      isValidAxiReff: "",
      fileSize: null,
     // url:"https://uatgw.dicicilaja.com/composer/storage/uploads/ktp/049KGAGzjK1S6Z0R4689y87dhx1e9BS.jpg"
    };
  },
  computed: {
    ...mapGetters("sap", [
      "areas",
      "cabangById",
      "jenis_axi",
      "jenis_kelamin",
      "agama",
      "statusPernikahan",
      "legalForm",
      "provinsis",
      "kotas",
      "kecamatans",
      "desas",
      "resBCA",
      "resDanamon",
      "desaId",
      "kecamatanbyId",
      "kotabyId",
      "provinsibyId",
      "cabang",
      "resUpdate",
      "crhName",
      "jenisKaryawan"
    ]),
    ...mapGetters("axi", [
      "banks",
      "axi",
      "included",
      "lokasi",
      "lokasiIncluded",
      "detailRegAxi"
    ]),
    // ...mapGetters("area", ["cabangById"]),
    idAxiDetail() {
      return this.$route.params.id;
    },
    stateCheckbox() {
      return this.alasan.length >= 1;
    }
  },
  async created() {
    this.getData();
    await this.getFilesizeRekening();
    await this.getFilesizeKtp();
    await this.getFilesizeNpwp();
   
  },
  methods: {
    ...mapActions("sap", [
      "getAreas",
      "getJenisAXI",
      "getJenisKelamin",
      "getAgama",
      "getStatusPernikahan",
      "getLegalForm",
      "getProvinsi",
      "getKota",
      "getKecamatan",
      "getKelurahan",
      "fetchBankBCA",
      "fetchBankDanamon",
      "getKelurahanbyId",
      "getKecamatanbyId",
      "getKotabyId",
      "getProvinsibyId",
      "getCabangById",
      "getCabang",
      "getCabangByAreaId",
      "updateDataDetail",
      "getCrhName",
      "fetchCheckKtp",
      "fetchCheckKtpPasangan",
      "postUploadToECM",
      "getJenisKaryawan"
    ]),
    ...mapActions("axi", [
      "getBanks",
      "getAxiDetailList",
      "getAxi",
      "getLokasi",
      "getRefferalAxi",
      "compressKTPToCloudinary",
      "compressNPWPToCloudinary",
      "compressRekeningToCloudinary"
    ]),
    // ...mapActions("area", ["getCabangByAreaId"]),
    async getData() {
      this.isBusy = true;
      this.isShow = false;
      
      
      try {
        await Promise.all([
          await this.getJenisAXI(),
          this.getJenisKelamin(),
          this.getAgama(),
          this.getStatusPernikahan(),
          this.getLegalForm(),
          this.getProvinsi(),
          this.getBanks(),
          this.getAreas(),
          this.getCabang(),
          this.getAxiDetailList(this.idAxiDetail),
          this.getJenisKaryawan(),
          
          //this.setJenisAxi()
    
          // this.getAxi(this.idAxiDetail),
          // this.getLokasi(this.axi.attributes.cabang_id)
        ]);
        // console.log(this.cabangById.kode);
        // if (this.axi.attributes.status_id == 32) {
        //   this.$router.push("/administrator/axi/pendaftaran");
        // } else {
        // this.axiData = this.packData();

        // console.log(this.detailRegAxi);
        // console.log(this.desaId);
        
        if (this.detailRegAxi) {

          let paramDesaId = this.detailRegAxi.desa_id && this.detailRegAxi.desa_id != 0 ? this.detailRegAxi.desa_id : 'not_found';
          await this.getKelurahanbyId(paramDesaId); 

          if(this.desaId.length > 0 && this.detailRegAxi.desa_id) {
            await this.getKecamatanbyId(this.desaId[0].kecamatanId);
            await this.getKotabyId(this.kecamatanbyId[0].kabupatenId);
            await this.getProvinsibyId(this.kotabyId[0].provinsiId);
            
            await this.getKota(this.kotabyId[0].provinsiId);
            await this.getKecamatan(this.kecamatanbyId[0].kabupatenId);
            await this.getKelurahan(this.desaId[0].kecamatanId);
          }
          await this.setDataDetail(this.detailRegAxi);
          await this.getCabangById(this.detailRegAxi.cabang_id);
          await this.assignListOfValue();
          if(this.cabangById) {
              await this.getCrhName(this.cabangById.kode);
              this.form.area_id = this.cabangById.areaId;
            }



            //await this.setJenisAxi();
        }
        this.isBusy = false;
        this.isShow = true;    
      } catch (error) {     
        console.log(error) 
        this.isBusy = false;
        this.isError = true;
      }
    },
   
    async setJenisAxi() {
      //console.log('Current jenis_axi:', this.form.jenis_axi);
      if (this.form.jenis_axi == "2") {
        this.form.tipe_npwp = "2";
      } else {
        this.form.tipe_npwp = "1";
      }
      //console.log('Updated tipe_npwp:', this.form.tipe_npwp);
    },
    async setDataDetail(val) {
      //console.log(val,'valll');

      this.form = {
        jenis_karyawan: val.jenis_karyawan,
        jenis_axi: parseInt(val.jenis_axi),
        area_id: "",
        axi_id_reff: val.axi_id_reff,
        cabang_daftar: val.cabang_daftar,
        nama: val.nama,
        no_ktp: val.no_ktp,
        tanggal_lahir: moment(val.tanggal_lahir).format("YYYY-MM-DD"),
        bank_id: val.bank_id,
        no_rekening: val.no_rekening,
        an_rekening: val.an_rekening,
        cabang_bank: val.cabang_bank,
        email: val.email,
        alamat_ktp: val.jalan,
        legal_form: val.legal_form,
        kota_bank: val.kota_bank,
        // nama_ibu_kandung: val.nama_ibu_kandung,
        no_npwp: val.no_npwp,
        no_hp: val.no_hp,
        pkp: val.pkp,
        rt: val.rt,
        rw: val.rw,
        // zipcode: val.desa_id,
        kota_lahir: val.kota_lahir,
        jenis_kelamin:
          val.jenis_kelamin === "" || val.jenis_kelamin === null
            ? ""
            : parseInt(val.jenis_kelamin),
        agama:val.agama === "" || val.agama === null || val.agama === "null" ? "" : parseInt(val.agama),
        status_perkawinan:
          val.status_perkawinan === "" || val.status_perkawinan === null
            ? ""
            : parseInt(val.status_perkawinan),
        npwp: val.no_npwp === "000000000000000" ? "2" : "1",
        nama_npwp: val.nama_npwp,
        //tipe_npwp: val.tipe_npwp === null ? "2" : val.tipe_npwp,
        status_registrasi:
          val.status_registrasi == "BARU" ||
          val.status_registrasi == "PEMBAHARUAN" ||
          val.status_registrasi == "PENGECEKAN"
            ? "PENGECEKAN"
            : val.status_registrasi,
        nama_pasangan: val.nama_pasangan,
        no_ktp_pasangan: val.no_ktp_pasangan,
        //   kelurahan_id: "",
        //   provinsi_id: "",
        //   kota_id: "",
        //   kecamatan_id: "",
        //   agreement: true,
        tipe_npwp: val.tipe_npwp,
      };
      this.foto_rekening =
        val.foto_rekening == null ? "/images/not-found.jpg" : val.foto_rekening;
        this.getFilesizeRekening();

        
      this.foto_ktp =
        val.foto_ktp == null ? "/images/not-found.jpg" : val.foto_ktp;
       this.getFilesizeKtp();
       

      this.foto_npwp =
        val.foto_npwp == null ? "/images/not-found.jpg" : val.foto_npwp;
        await this.getFilesizeNpwp();
        
     // val.foto_ktp == null ? "/images/not-found.jpg" : val.foto_ktp;
      this.foto_selfie =
        val.foto_selfie == null || ""
          ? "/images/not-found.jpg"
          : val.foto_selfie;
      if (
        val.status_registrasi == "SETUJU" ||
        val.status_registrasi == "AKAN NONAKTIF" ||
        val.status_registrasi == "AKTIF"
      ) {
        this.form.status_registrasi = "SETUJU";
        this.isDisableStatus = true;
      }
    },
    async assignListOfValue() {
      this.listJenisAxi = this.jenis_axi.map(item => {
        return { value: item.id, label: item.deskripsi };
      });
      this.listJenisKelamin = this.jenis_kelamin.map(item => {
        return { value: item.id, label: item.deskripsi };
      });
      this.listAgama = this.agama.map(item => {
        return { value: item.id, label: item.deskripsi };
      });
      this.listStatusPernikahan = this.statusPernikahan.map(item => {
        return { value: item.id, label: item.deskripsi };
      });
      // console.log(this.listStatusPernikahan);

      this.listLegalForm = this.legalForm.map(item => {
        return { value: item.kode, label: item.deskripsi };
      });
      this.listProvinsi = this.provinsis.map(item => {
        return { value: item.id, label: item.nama };
      });
      this.listKota = this.kotas.map(item => {
        return { value: item.id, label: item.nama };
      });
      this.listKecamatan = this.kecamatans.map(item => {
        return { value: item.id, label: item.nama };
      });
      this.listKelurahan = this.desas.map(item => {
        return { value: item.id, label: item.nama, zipcode: item.kodePos };
      });
      this.listBanks = this.banks.map(item => {
        return { value: item.id, label: item.attributes.nama };
      });
      this.listAreas = this.areas.map(item => {
        return { value: item.id, label: item.nama };
      });
      this.listBranches = this.cabang.map(item => {
        return {
          value: item.id,
          label: item.nama
          // label: `${item.attributes.nama} - ${item.attributes.alamat}`
        };
      });
      this.listCRHName = this.crhName.map(item => {
        return {
          value: item.crhName,
          label: item.crhName,
          crhEmail: item.crhEmail
        };
      });
      this.listJenisKaryawan = this.jenisKaryawan.map(item => {
        return { value: item.value1_param, label: item.value3_param };
      });
      this.form.kelurahan_id = this.desaId.map(item => {
        return { value: item.id };
      });

      // this.form.provinsi_id = this.provinsibyId[0].id;
      // this.form.kota_id = this.kotabyId[0].id;
      // this.form.kecamatan_id = this.kecamatanbyId[0].id;
      // this.form.kelurahan_id = this.desaId[0].id;
      // this.form.zipcode = this.desaId[0].kodePos;
      // this.form.area_id = this.areaById;
      // console.log(this.desas.kodePos);
      let isValidID = this.detailRegAxi.desa_id && this.detailRegAxi.desa_id != 0 ? true : false;
      if(isValidID){
        if (this.provinsibyId.length > 0) {
          this.form.provinsi_id = this.provinsibyId[0].id;
        }
        if (this.kotabyId.length > 0) {
          this.form.kota_id = this.kotabyId[0].id;
        }
        if (this.kecamatanbyId.length > 0 ) {
          this.form.kecamatan_id = this.kecamatanbyId[0].id;
        }
        if (this.desaId.length > 0) {
          this.form.kelurahan_id = this.desaId[0].id;
          this.form.zipcode = this.desaId[0].kodePos;
        }
      }
    },
    async setCRHName() {
      // console.log(this.form.cabang_daftar);

      await this.getCabangById(this.form.cabang_daftar);
      await this.getCrhName(this.cabangById.kode);
      // console.log(this.crhName);
      this.assignListOfValue();
    },
    async setCRH(value) {
      // console.log(this.listCRHName);

      const crhEmail = this.listCRHName.filter(function(item) {
        return item.value === value;
      });

      if (crhEmail) {
        this.setEmailCRH(crhEmail[0].crhEmail);
        // console.log(this.form.email_crh);
        // this.form.email_crh = crhEmail[0].crhEmail;
      }
    },
    async setEmailCRH(value) {
      this.form.email_crh = value;
    },
    getIncluded(type, detail, attr) {
      if (detail == null) {
        return "";
      } else {
        let result = this.included.find(obj => {
          return obj.type == type && obj.id == detail.id;
        });
        return result.attributes[attr];
      }
    },
    capitalize: function(value) {
      if (!value) return "";
      if (value == "DKI JAKARTA") return "DKI Jakarta";
      // value = value.toLowerCase()
      // return value.charAt(0).toUpperCase() + value.slice(1)
      return value
        .toLowerCase()
        .split(" ")
        .map(function(word) {
          return word[0].toUpperCase() + word.substr(1);
        })
        .join(" ");
    },
    async setProvinsi(val) {
      // console.log(val);
      this.provinsiId = val;
      await this.getKota(val);
      this.assignListOfValue();
    },
    async setKota(val) {
      // console.log(val);
      this.kotaId = val;
      await this.getKecamatan(val);
      this.assignListOfValue();
    },
    async setKecamatan(val) {
      // console.log(val);
      this.kecamatanId = val;
      await this.getKelurahan(val);
      this.assignListOfValue();
    },
    async setKodePos(val) {
      // console.log(val);
      this.form.zipcode = this.listKelurahan.filter(item => {
        item.zipcode = val;
      });
      // console.log(this.form.zipcode);
    },
    async setAreaId(val) {
      // console.log(val);
      this.areaId = val;
      this.form.cabang_daftar = "";
      const params = {
        cityId: "",
        areaId: val
      };
      await this.getCabangByAreaId(this.areaId);
      this.assignListOfValue();
    },
    changeRekening(ev) {
      this.form.foto_rekening = ev[0];
    },
    changeNoKtp() {
      // console.log("change");
      this.isKtpValid = "";
      this.isCheckKtp = false;
    },
    changeNoKtpPasangan() {
      // console.log("change");
      this.isKtpPasanganValid = "";
      this.isCheckKtpPasangan = false;
    },
    changeAxiReff() {
      this.isValidAxiReff = "";
    },
    async checkKTP() {
      this.isCheckKtp = true;
      if (this.form.no_ktp == "") {
        Swal.fire({
          title: "Oops...",
          text: "Silahkan Masukkan Nomor KTP",
          icon: "warning"
        });
      } else {
        this.busy = true;
        const payload = {
          no_ktp_pasangan: this.form.no_ktp,
          profile_id: this.idAxiDetail
        };
        const result = await this.fetchCheckKtpPasangan(payload);
        if (result.status == "OK") {
          this.isKtpValid = "Nomor KTP dapat digunakan.";
          Swal.fire({
            text: "Nomor KTP dapat digunakan.",
            type: "success"
          });
        } else {
          this.isKtpValid = result.data.message;
          Swal.fire({
            title: "Oops...",
            text:  result.data.message,
            type: "error"
          });
        }
        this.busy = false;
      }
    },
    async checkKTPPasangan() {
      this.isCheckKtpPasangan = true;
      if (this.form.no_ktp_pasangan == null || this.form.no_ktp_pasangan == "")  {
        Swal.fire({
          title: "Oops...",
          text: "Silahkan Masukkan Nomor KTP Pasangan",
          icon: "warning"
        });
      } else {
        this.busy = true;
        const payload = {
          no_ktp_pasangan: this.form.no_ktp_pasangan,
          profile_id: this.idAxiDetail
        };
        const result = await this.fetchCheckKtpPasangan(payload);
        if (result.status == "OK") {
          this.isKtpPasanganValid = result.message;
          Swal.fire({
            text: result.message,
            type: "success"
          });
        } else {
          this.isKtpPasanganValid = result.data.message;
          Swal.fire({
            title: "Oops...",
            text:  result.data.message,
            type: "error"
          });
        }
        this.busy = false;
      }
    },

  async compressKTP() {
    this.isBusyCompressKtp = true;
  const foto_ktp = this.foto_ktp;
  const imageUrl = foto_ktp; // Replace with your image URL
  try {
    const response = await axios.get(imageUrl, { responseType: 'blob' });
    const urlParts = imageUrl.split('/');
    const originalFileName = urlParts[urlParts.length - 1];
    const blob = response.data;
    const file = new File([blob], originalFileName, { type: blob.type });

    const payload = {
      file: file,
      foto: "foto_ktp"
    };

    const result = await this.compressKTPToCloudinary(payload);
    //await this.getFilesizeKtp();

    if (result.status === 200) {
     this.isCompressButtonClickedKtp = true;
     this.fileSizeKtp = result.data.file_size;
      Swal.fire({
        text: `Image compressed successfully. New file size: ${this.formatBytes(result.data.file_size, 2)}`, 
        type: "success"
      });
    } else {
      Swal.fire({
        title: "Oops...",
        text: result.message,
        type: "error"
      });
    }
  } catch (error) {
    console.error('Error fetching image:', error);
  } finally {
    this.isBusyCompressKtp = false;
  }
},

  async compressNPWP() {
    this.isBusyCompressNpwp = true;
  const foto_npwp = this.foto_npwp;
  const imageUrl = foto_npwp; // Replace with your image URL
  console.log(this.foto_npwp);
    try {
       const response = await axios.get(imageUrl, { responseType: 'blob' });
    // Get the original file name from the URL
       const urlParts = imageUrl.split('/');
       const originalFileName = urlParts[urlParts.length - 1];
    // Create a File object with the original file name
       const blob = response.data;
       const file = new File([blob], originalFileName, { type: blob.type });
    // Now 'file' contains the image as a File object with the original file name
        const payload = {
          file: file,
          foto: "foto_npwp"
        };
        const result = await this.compressNPWPToCloudinary(payload);
        if (result.status === 200) {
          this.isCompressButtonClickedNpwp = true; 
          this.fileSizeNpwp = result.data.file_size;
            Swal.fire({
            text: `Image compressed successfully. New file size: ${this.formatBytes(result.data.file_size, 2)}`,
            type: "success"
          });
        }else {
          Swal.fire({
            title: "Oops...",
            text: result.message,
            type: "error"
          });
        }
    } catch (error) {
    console.error('Error fetching image:', error);
    } finally {
      this.isBusyCompressNpwp = false;
   }
  },
  
  async compressRekening() {
    this.isBusyCompressRekening = true;
  const foto_rekening = this.foto_rekening;
  const imageUrl = foto_rekening; // Replace with your image URL
    try {
       const response = await axios.get(imageUrl, { responseType: 'blob' });
    // Get the original file name from the URL
       const urlParts = imageUrl.split('/');
       const originalFileName = urlParts[urlParts.length - 1];
    // Create a File object with the original file name
       const blob = response.data;
       const file = new File([blob], originalFileName, { type: blob.type });
    // Now 'file' contains the image as a File object with the original file name
        const payload = {
          file: file,
          foto: "foto_rekening"
        };
        const result = await this.compressRekeningToCloudinary(payload);
        this.busy = true;

        if (result.status === 200) {
          this.isCompressButtonClickedRekening = true; 
          this.fileSizeRekening = result.data.file_size;
            Swal.fire({
            text: `Image compressed successfully. New file size: ${this.formatBytes(result.data.file_size, 2)}`,
            type: "success"
          });
        } else {
          Swal.fire({
            title: "Oops...",
            text: result.message,
            type: "error"
          });
        }
    } catch (error) {
    console.error('Error fetching image:', error);
    } finally {
      this.isBusyCompressRekening = false;
   }
  },
  async getFilesizeRekening() {
    try {
        const response = await axios.head(this.foto_rekening);
        const contentLength = response.headers['content-length'];

        if (contentLength) {
          this.fileSizeRekening = parseInt(contentLength, 10); // Ukuran file dalam byte
        } else {
          console.error('Header "content-length" not found in the response.');
          this.fileSizeRekening = null;
        }
      } catch (error) {
        console.error('Error fetching URL:', error.message);
        this.fileSizeRekening = null;
      }
    },

    async getFilesizeKtp() {
    try {
      console.log('file size ktp', this.foto_ktp);
        const response = await axios.head(this.foto_ktp);
        const contentLength = response.headers['content-length'];

        if (contentLength) {
          this.fileSizeKtp = parseInt(contentLength, 10); // Ukuran file dalam byte
        } else {
          console.error('Header "content-length" not found in the response.');
          this.fileSizeKtp = null;
        }
      } catch (error) {
        console.error('Error fetching URL:', error.message);
        this.fileSizeKtp = null;
      }
    },
    async getFilesizeNpwp() {
    try {
      console.log(this.foto_npwp);
        const response = await axios.head(this.foto_npwp);
        const contentLength = response.headers['content-length'];

        if (contentLength) {
          this.fileSizeNpwp = parseInt(contentLength, 10); // Ukuran file dalam byte
        } else {
          console.error('Header "content-length" not found in the response.');
          this.fileSizeNpwp = null;
        }
      } catch (error) {
        console.error('Error fetching URL:', error.message);
        this.fileSizeNpwp = null;
      }
    },
    formatBytes(bytes, decimals = 2) {
      if (bytes === 0) return "0 Bytes";

      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    },
    async checkRefferal() {
      this.isCheckRefferal = true;
      this.isBusyRefferal = true;
      const result = await this.getRefferalAxi(this.form.axi_id_reff);
      this.isBusyRefferal = false;
      //console.log(result.data);

      const axiIdData = result.data.length > 0 ? result.data[0].attributes : "";

      // console.log(this.axiIdData);
      this.isValidAxiReff =
        axiIdData != "" &&
        axiIdData.status_id != 32 &&
        axiIdData.jenis_axi == "2" &&
        axiIdData.jenis_axi == null
          ? axiIdData.nama
          : axiIdData == ""
          ? "Nomor AXI Tidak Ditemukan"
          : axiIdData != "" && axiIdData.status_id != 32
          ? "Nomor AXI Tidak aktif"
          : axiIdData != "" &&
            axiIdData.jenis_axi == "2" &&
            axiIdData.jenis_axi !== null
          ? "Nomor AXI Tidak dapat digunakan sebagai axi refferal"
          : axiIdData != "" && axiIdData.jenis_axi === null
          ? "Nomor AXI belum dapat digunakan"
          : axiIdData.nama;
      //console.log(this.isValidAxiReff);
      if (!this.isValidAxiReff.includes("Nomor AXI")) {
        Swal.fire({
          title: "Berhasil!",
          text: `Data Refferal AXI a.n ${axiIdData.nama}`,
          type: "success"
        });
      } else {
        this.isCheckRefferal = false;
        Swal.fire({
          title: "Gagal!",
          text: `${this.isValidAxiReff}`,
          type: "error"
        });
      }
    },
    //async checkBank() {
      //this.isCheck = true;
      //const bankId = this.form.bank_id;
      // console.log(bankId);

      //this.result = [];

      //if (bankId === "8") {
       // const payload = {
          //accountName: this.form.an_rekening,
          //accountNumber: this.form.no_rekening
       // };
        //this.result = await this.fetchBankBCA(payload);
      //} else if (bankId === "4") {
        //const payload = {
         // requestTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
         // accountNumber: this.form.no_rekening
        //};
        //this.result = await this.fetchBankDanamon(payload);
      //} else {
       // Swal.fire({
          //title: "Oops!",
          //text:
          //  "Untuk sementara hanya Bank BCA dan Danamon yang dapat dilakukan pengecekan",
         // type: "warning"
        //});
      //}
      // console.log(this.result.data);
      // if (this.result)
    //},
    async submit() {
      this.submitted = true;
      this.ischeckstatus = true;
      const valid = await this.$refs.formObserver.validate();
      console.log(valid);
      if (this.form.bank_id !== "8" || this.form.bank_id !== "4") {
        this.isCheck = true;
      }
      this.form.jenis_karyawan = this.form.jenis_axi !== 3 ? null : this.form.jenis_karyawan;
      this.form.axi_id_reff = this.form.jenis_axi === 3 ? null : this.form.axi_id_reff;
      this.form.legal_form = this.form.tipe_npwp === '1' ? null : this.form.legal_form;

      if (!valid) {
        // window.scrollTo(0, 0);
        Swal.fire({
          title: "Oops!",
          text:
            "Sepertinya ada data yang belum tervalidasi, silahkan cek kembali data anda!",
          type: "warning"
        });
      }
      if (!this.isCheck) {
        Swal.fire({
          title: "Oops!",
          text: "Sepertinya anda belum melakukan pengecekan untuk data bank!",
          type: "warning"
        });
      }
      if (this.form.status_perkawinan === 1 && !this.isCheckKtpPasangan ) {
          this.ischeckstatus = false;
        Swal.fire({
         title: "Oops!",
          text: "Sepertinya anda belum melakukan pengecekan untuk data KTP PASANGAN!",
          type: "warning"
         });
      }
        
      if (this.form.status_registrasi === 'SETUJU' && (this.fileSizeKtp >= 3145728 || this.fileSizeNpwp >= 3145728 || this.fileSizeRekening >= 3145728)) {
            this.ischeckstatus = false;
            Swal.fire({
            title: 'Oops!',
            text: 'Harap melakukan kompres File KTP/NPWP/Buku Rekening terlebih dahulu!',
            type: 'warning'
            });
          }

      if (!this.isCheckKtp) {
        Swal.fire({
          title: "Oops!",
          text: "Sepertinya anda belum melakukan pengecekan untuk data KTP!",
          type: "warning"
        });
      }
      if (!this.isCheckRefferal && this.form.axi_id_reff) {
        Swal.fire({
          title: "Oops!",
          text:
            "Sepertinya anda belum melakukan pengecekan untuk data AXI ID Refferal!",
          type: "warning"
        });
      }
      
      if (valid && this.isCheck && this.ischeckstatus && this.isCheckKtp) {
        if (
          this.form.status_registrasi === "TOLAK" ||
          this.form.status_registrasi === "REVISI"
        ) {
          this.$nextTick(() => {
            this.$bvModal.show("modal-prevent-closing");
          });
        } else if (
          this.form.status_registrasi === "SETUJU" &&
          this.isCheckKtp 
        ) {
          if (this.isKtpValid.includes("tidak")) {
            Swal.fire({
              title: "Oops!",
              text: "Pastikan data KTP atau KTP Pasangan valid!",
              type: "warning"
            });
          } else {
            // console.log(this.form);
            const profileId = this.idAxiDetail;
            const payload = {
              ...this.form,
              status_registrasi: "SETUJU",
              status_perkawinan:
                this.form.status_perkawinan === 0
                  ? "0"
                  : this.form.status_perkawinan,
              nama_npwp:
                this.form.npwp === "2" ? this.form.nama : this.form.nama_npwp,
              no_npwp:
                this.form.npwp === "2" ? "000000000000000" : this.form.no_npwp
              // profileId: this.idAxiDetail
            };
            this.isBusy = true;
            const isFetchToECM = await this.uploadFileToECM();
            console.log(isFetchToECM);
            if (isFetchToECM == "ok") {
              await this.updateDataDetail({ payload, profileId });
              // console.log(payload);
              if (this.resUpdate == "Sukses") {
                this.isBusy = false;
                Swal.fire({
                  title: "Selamat!",
                  text: "Data Berhasil diubah!",
                  type: "success"
                });
                this.$router.push("/administrator/axi/pendaftaran");
              } else {
                this.isBusy = false;
                Swal.fire({
                  title: "Oops!",
                  text: "Terjadi Kesalahan!",
                  type: "error"
                });
              }
            } else {
              this.isBusy = false;
              Swal.fire({
                title: "Error!",
                text: "Upload file to ECM failed!",
                type: "error"
              });
            }
          }
        } else {
          const profileId = this.idAxiDetail;
          const payload = {
            ...this.form,
            status_registrasi: "PENGECEKAN",
            status_perkawinan:
              this.form.status_perkawinan === 0
                ? "0"
                : this.form.status_perkawinan,
            nama_npwp:
              this.form.npwp === "2" ? this.form.nama : this.form.nama_npwp,
            no_npwp:
              this.form.npwp === "2" ? "000000000000000" : this.form.no_npwp
            // profileId: this.idAxiDetail
          };
          this.isBusy = true;
          this.result = await this.updateDataDetail({ payload, profileId });
          // console.log(this.result.data);
          if (this.resUpdate == "Sukses") {
            this.isBusy = false;
            Swal.fire({
              title: "Selamat!",
              text: "Data Berhasil diubah!",
              type: "success"
            });
            this.$router.push("/administrator/axi/pendaftaran");
          } else {
            this.isBusy = false;
            Swal.fire({
              title: "Oops!",
              text: "Terjadi Kesalahan!",
              type: "error"
            });
          }
        }
      }
    },
    async uploadFileToECM() {
      const payload = {
        profileId: this.idAxiDetail,
        crhEmail: this.form.email_crh
      };
      try {
        const result = await this.postUploadToECM(payload);
        console.log(result.status);
        return result.status;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async checkFormValidity() {
      if (this.form.status_registrasi === "TOLAK") {
        let valid = this.$refs.formReject.checkValidity();
        this.alasan.push(this.rejectNote);
        const profileId = this.idAxiDetail;
        const payload = {
          ...this.form,
          // link_revisi: this.link_revisi,
          alasan: this.alasan,
          nama_npwp:
            this.form.npwp === "2" ? this.form.nama : this.form.nama_npwp,
          no_npwp:
            this.form.npwp === "2" ? "000000000000000" : this.form.no_npwp
          // profileId: this.idAxiDetail
        };
        this.isBusy = true;
        this.result = await this.updateDataDetail({ payload, profileId });
        // console.log(this.result);
        this.$nextTick(() => {
          this.$bvModal.hide("modal-prevent-closing");
        });
        if (this.resUpdate == "Sukses") {
          this.isBusy = false;
          Swal.fire({
            title: "Selamat!",
            text: "Data Berhasil diubah!",
            type: "success"
          });
          this.$router.push("/administrator/axi/pendaftaran");
        } else {
          this.isBusy = false;
          Swal.fire({
            title: "Oops!",
            text: "Terjadi Kesalahan!",
            type: "error"
          });
        }
      } else if (this.form.status_registrasi === "REVISI") {
        let valid = this.$refs.formRevisi.checkValidity();
        // console.log(valid);

        this.alasan.push(this.rejectNote);
        // console.log(this.alasan);
        const profileId = this.idAxiDetail;
        const payload = {
          ...this.form,
          alasan: this.alasan,
          status_perkawinan:
            this.form.status_perkawinan === 0
              ? "0"
              : this.form.status_perkawinan,
          nama_npwp:
            this.form.npwp === "2" ? this.form.nama : this.form.nama_npwp,
          no_npwp:
            this.form.npwp === "2" ? "000000000000000" : this.form.no_npwp
          // profileId: this.idAxiDetail
        };
        // console.log(payload);

        this.isBusy = true;
        this.result = await this.updateDataDetail({ payload, profileId });
        // console.log(this.result);
        this.$nextTick(() => {
          this.$bvModal.hide("modal-prevent-closing");
        });
        // console.log(this.resUpdate);

        if (this.resUpdate == "Sukses") {
          this.isBusy = false;
          Swal.fire({
            title: "Selamat!",
            text: "Data Berhasil diubah!",
            type: "success"
          });
          this.$router.push("/administrator/axi/pendaftaran");
        } else {
          this.isBusy = false;
          Swal.fire({
            title: "Oops!",
            text: "Terjadi Kesalahan!",
            type: "error"
          });
        }
      }
      // console.log(valid);

      this.stateCheckbox = valid;
      return valid;
    },
    resetModal() {
      this.listReject = "";
      this.nameState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      // console.log(bvModalEvt);

      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // console.log(this.form);

      // Push the name to submitted names
      // this.submittedNames.push(this.listReject);
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    }
  }
};
</script>

<style scope>
.center-text {
  text-align: center; /* Mengatur teks menjadi pusat (centered) */
}

strong {
  font-weight: bold; /* Membuat teks dalam elemen <strong> menjadi tebal */
}

</style>
