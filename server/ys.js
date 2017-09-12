const ys = {

  calculateYs: function(construction, inventory){
    if(construction.type == 'long'){
      return ys_constr_long(construction, inventory)
    }else if(construction.type == 'trans'){
      if(construction.cd.has_apron){
        return ys_constr_trans_with_apron(construction, inventory)
      }else{
        return ys_constr_trans_without_apron(construction, inventory)
      }
    }

    return -1
  }
}


function ys_constr_trans_with_apron(construction, inventory){
  let dam = construction.cd.dam // dam

  let damInv = inventory.dam // dam inventory

  let fpInv = inventory.final_spur // final spur inventory

  let sum = 0



  if((fVal(dam.ye) + fVal(dam.h) == 0) || fVal(dam.b) == 0){
    return -1
  }

  // ============ Lucreare propriu-zisa ===============

  // decastrare
  let ponder_lucr_decastrare = 0.92
  let ilim_lucr_decastrare = 1

  let Ii_lucr_decastrare = (fVal(damInv.dec_left) + fVal(damInv.dec_right)) / (fVal(dam.ye) + fVal(dam.h))

  sum +=  ponder_lucr_decastrare * Math.min( Ii_lucr_decastrare / ilim_lucr_decastrare , 1)



  // afuiere
  let ponder_lucr_afuiere = 2.52
  let ilim_lucr_afuiere = 2

  let Ii_lucr_afuiere = fVal(damInv.af_height) * fVal(damInv.af_percent) / 100

  sum += ponder_lucr_afuiere * Math.min( Ii_lucr_afuiere / ilim_lucr_afuiere , 1 )




  // fisurare
  let ponder_lucr_fisurare = 0.74
  let ilim_lucr_fisurare = 10

  let Ii_lucr_fisurare = fVal(damInv.h_crak_dev_l) / fVal(dam.b) + fVal(damInv.v_crak_dev_l) / (fVal(dam.ye) + fVal(dam.h))

  sum += ponder_lucr_fisurare * Math.min( Ii_lucr_fisurare / ilim_lucr_fisurare , 1)



  // desprindere zona deversata
  let ponder_lucr_desp_z_dev = 1.90
  let ilim_lucr_desp_z_dev = 1

  let Ii_despr_z_dev = fVal(damInv.detach_dev_percent) / 100

  sum += ponder_lucr_desp_z_dev * Math.min( Ii_despr_z_dev / ilim_lucr_desp_z_dev , 1)



  // desprindere aripi
  let ponder_lucr_desp_aripi = 3.27
  let ilim_lucr_desp_aripi = 1

  let Ii_lucr_desp_aripi = ( fVal(damInv.detach_undev_left_percent) + fVal(damInv.detach_undev_right_percent) ) / (2 * 100)

  sum += ponder_lucr_desp_aripi * Math.min( Ii_lucr_desp_aripi / ilim_lucr_desp_aripi , 1 )



  // eroziune
  let ponder_lucr_eroziune = 0.82
  let ilim_lucr_eroziune = 50

  let Ii_lucr_eroz = fVal(damInv.erosion_height) * fVal(damInv.erosion_percent) / 100

  sum += ponder_lucr_eroziune * Math.min( Ii_lucr_eroz / ilim_lucr_eroziune , 1 )



  // ============ Radier ===============

  // fisurare
  let ponder_rad_fisurare = 0.66
  let ilim_rad_fisurare = 5

  let Ii_rad_fisurare = fVal(damInv.apron_crack_nr) * fVal(damInv.apron_crack_percent) / 100

  sum += ponder_rad_fisurare * Math.min( Ii_rad_fisurare / ilim_rad_fisurare , 1)



  // desprindere
  let ponder_rad_desprindere = 1.33
  let ilim_rad_desprindere = 1

  let Ii_rad_desprindere = fVal(damInv.apron_detach_percent) / 100

  console.log('Ii_rad_desprindere', Ii_rad_desprindere)

  sum += ponder_rad_desprindere * Math.min( Ii_rad_desprindere / ilim_rad_desprindere , 1)



  // afuiere
  let ponder_rad_afuiere = 0.24
  let ilim_rad_afuiere = 1

  let Ii_rad_afuiere = fVal(damInv.apron_af_height) * fVal(damInv.apron_af_percent) / 100

  sum += ponder_rad_afuiere * Math.min( Ii_rad_afuiere / ilim_rad_afuiere , 1)



  // eroziune
  let ponder_rad_eroziune = 0.52
  let ilim_rad_eroziune = 50

  let Ii_rad_eroziune = fVal(damInv.apron_erosion_height) * fVal(damInv.apron_erosion_percent) / 100

  sum += ponder_rad_eroziune * Math.min( Ii_rad_eroziune / ilim_rad_eroziune , 1)



  // ============ Sistem disipator ==========

  // desprindere dinti
  let ponder_disip_desp_dinti = 0.03
  let ilim_disip_desp_dinti = 1

  let Ii_disip_despr = fVal(dam.apron_teeth_no) ? fVal(damInv.apron_teeth_detach_nr) / fVal(dam.apron_teeth_no) : 0

  sum += ponder_disip_desp_dinti * Math.min( Ii_disip_despr / ilim_disip_desp_dinti , 1)



  // desprindere contrabaraj
  let ponder_disip_desp_contrabaraj = 0.10
  let ilim_disip_desp_contrabaraj = 1

  let Ii_disip_contrabaraj = fVal(damInv.apron_detach_counter_dam_percent) / 100

  sum += ponder_disip_desp_contrabaraj * Math.min( Ii_disip_contrabaraj / ilim_disip_desp_contrabaraj , 1)



  // ============ Ziduri de conducere ===============

  // fisurare
  let ponder_zc_fisurare = 0.31
  let ilim_zc_fisurare = 5

  let Ii_zc_fisurare = fVal(dam.lr) ? (fVal(damInv.sidewall_left_horiz_length) + fVal(damInv.sidewall_left_vert_length) + fVal(damInv.sidewall_right_horiz_length) + fVal(damInv.sidewall_right_vert_length)) / fVal(dam.lr) : 0

  sum += ponder_zc_fisurare * Math.min( Ii_zc_fisurare / ilim_zc_fisurare , 1 )



  // desprindere
  let ponder_zc_desprindere = 1
  let ilim_zc_desprindere = 1

  let Ii_zc_desprindere = ( fVal(damInv.sidewall_left_displaced_percent) + fVal(damInv.sidewall_right_displaced_percent) )/ (2* 100)

  sum += ponder_zc_desprindere * Math.min( Ii_zc_desprindere / ilim_zc_desprindere , 1 )



  // eroziune
  let ponder_zc_eroziune = 0.18
  let ilim_zc_eroziune = 50

  let Ii_zc_eroziune = ( fVal(damInv.sidewall_left_abrasion_deep) * fVal(damInv.sidewall_left_abrasion_percent) + fVal(damInv.sidewall_right_abrasion_deep) * fVal(damInv.sidewall_right_abrasion_percent) ) / (2* 100)

  sum += ponder_zc_eroziune * Math.min( Ii_zc_eroziune / ilim_zc_eroziune , 1 )



  // ============ Pinten terminal ===============

  if(construction.cd.has_final_spur){

    let hz = fVal(dam.hz) ? fVal(dam.hz) : Math.max( 1, fVal(dam.h))

    let bp = fVal(construction.cd.final_spur.spur_length) ? fVal(construction.cd.final_spur.spur_length) : fVal(dam.br) + 4*fVal(dam.h)

    // decastrare
    let ponder_pt_decastrare = 0.59
    let ilim_pt_decastrare = 1

    let Ii_pt_decastrare = ( fVal(fpInv.final_spur_decastr_left) + fVal(fpInv.final_spur_decastr_right) ) / hz

    sum += ponder_pt_decastrare * Math.min( Ii_pt_decastrare / ilim_pt_decastrare , 1 )



    // fisurare
    let ponder_pt_fisurare = 0.45
    let ilim_pt_fisurare = 5

    let Ii_pt_fisurare = bp ? (fVal(fpInv.final_spur_horiz_crack_length) + fVal(fpInv.final_spur_vert_crack_length)) / bp : 0

    sum += ponder_pt_fisurare * Math.min( Ii_pt_fisurare / ilim_pt_fisurare , 1 )



    // desprindere
    let ponder_pt_desprindere = 1.18
    let ilim_pt_desprindere = 1

    let Ii_pt_desprindere =  ( fVal(fpInv.final_spur_detach_left_percent) + fVal(fpInv.final_spur_detach_right_percent) + fVal(fpInv.final_spur_detach_center_percent) ) / (3*100)

    sum += ponder_pt_desprindere * Math.min( Ii_pt_desprindere / ilim_pt_desprindere , 1)



    // eroziune
    let ponder_pt_eroziune = 0.38
    let ilim_pt_eroziune = 50

    let Ii_pt_eroziune = fVal(fpInv.final_spur_erosion_height) * fVal(fpInv.final_spur_erosion_percent) / 100

    sum += ponder_pt_eroziune * Math.min( Ii_pt_eroziune / ilim_pt_eroziune , 1 )



  }


    let YaRef = 31.32

    let ys = 100 - ( 1000 * Math.sqrt(sum) )/ YaRef


    return ys.toFixed(2)
}

function ys_constr_trans_without_apron(construction, inventory){
  let dam = construction.cd.dam // dam

  let damInv = inventory.dam // dam inventory

  let fpInv = inventory.final_spur // final spur inventory

  let sum = 0

  if((fVal(dam.ye) + fVal(dam.h) == 0) || fVal(dam.b) == 0){
    return -1
  }

    // ============ Lucreare propriu-zisa ===============
    // decastrare
    let ponder_lucr_decastrare = 2.41
    let ilim_lucr_decastrare = 1

    let Ii_lucr_decastrare = (fVal(damInv.dec_left) + fVal(damInv.dec_right)) / (fVal(dam.ye) + fVal(dam.h))

    sum += ponder_lucr_decastrare * Math.min( Ii_lucr_decastrare / ilim_lucr_decastrare , 1 )

    // afuiere
    let ponder_lucr_afuiere = 1.79
    let ilim_lucr_afuiere = 2

    let Ii_lucr_afuiere = fVal(damInv.af_height) * fVal(damInv.af_percent) / 100

    sum += ponder_lucr_afuiere * Math.min( Ii_lucr_afuiere / ilim_lucr_afuiere , 1 )

    // fisurare
    let ponder_lucr_fisurare = 2.15
    let ilim_lucr_fisurare = 5

    let Ii_lucr_fisurare = fVal(damInv.h_crak_dev_l) / fVal(dam.b) + fVal(damInv.v_crak_dev_l) / (fVal(dam.ye) + fVal(dam.h))

    sum += ponder_lucr_fisurare * Math.min( Ii_lucr_fisurare / ilim_lucr_fisurare , 1 )

    // desprindere zona deversata
    let ponder_lucr_desp_z_dev = 5.23
    let ilim_lucr_desp_z_dev = 1

    let Ii_despr_z_dev = fVal(damInv.detach_dev_percent) / 100

    sum += ponder_lucr_desp_z_dev * Math.min( Ii_despr_z_dev / ilim_lucr_desp_z_dev , 1 )

    // desprindere aripi
    let ponder_lucr_desp_aripi = 9.66
    let ilim_lucr_desp_aripi = 1

    let Ii_lucr_desp_aripi = ( fVal(damInv.detach_undev_left_percent) + fVal(damInv.detach_undev_right_percent) ) / (2 * 100)

    sum += ponder_lucr_desp_aripi * Math.min( Ii_lucr_desp_aripi / ilim_lucr_desp_aripi , 1 )

    // eroziune
    let ponder_lucr_eroziune = 1.92
    let ilim_lucr_eroziune = 50

    let Ii_lucr_eroz = fVal(damInv.erosion_height) * fVal(damInv.erosion_percent) / 100

    sum += ponder_lucr_eroziune * Math.min( Ii_lucr_eroz / ilim_lucr_eroziune , 1 )

    let YaRef = 38.59

    let ys = 100 - ( 1000 * Math.sqrt(sum) )/ YaRef

    return ys.toFixed(2)
}





function ys_constr_long(construction, inventory){
  let sum = 0

  let sec = construction.cd.sectors
  let secInv = inventory.sectors

  let sectorsTotalLenght = 0

  let sectorsLength = [];

  sec.forEach(s => {
    sectorsLength.push( fVal(s.sector_length) )
    sectorsTotalLenght += fVal(s.sector_length)
  })

  if(sectorsTotalLenght == 0)  return -1

  // ============ Radier ===============

  // fisurare
  let ponder_rad_fisurare = 0.92
  let ilim_rad_fisurare = 5

  let Ii_rad_fisurare = 0

  secInv.forEach((s, index) => {
    Ii_rad_fisurare += fVal(s.apron_craks_nr) * fVal(s.apron_damage_percent) * sectorsLength[index]
  })

  Ii_rad_fisurare = Ii_rad_fisurare/(100 * sectorsTotalLenght)

  sum += ponder_rad_fisurare * Math.min( Ii_rad_fisurare / ilim_rad_fisurare , 1 )

  // desprindere
  let ponder_rad_desprindere = 3.25
  let ilim_rad_desprindere = 1

  let Ii_rad_desprindere = 0

  secInv.forEach((s, index) => {
    Ii_rad_desprindere += fVal(s.apron_displaced)  * sectorsLength[index]
  })

  Ii_rad_desprindere = Ii_rad_desprindere/(100 * sectorsTotalLenght)

  sum += ponder_rad_desprindere * Math.min( Ii_rad_desprindere / ilim_rad_fisurare , 1 )

  // eroziune
  let ponder_rad_eroziune = 1.28
  let ilim_rad_eroziune = 50

  let Ii_rad_eroziune = 0

  secInv.forEach((s, index) => {
    Ii_rad_eroziune += fVal(s.apron_abrasion_deep) * fVal(s.apron_abrasion_percent)  * sectorsLength[index]
  })

  Ii_rad_eroziune = Ii_rad_eroziune/(100 * sectorsTotalLenght)

  sum += ponder_rad_eroziune * Math.min( Ii_rad_eroziune / ilim_rad_eroziune , 1)

  // ============ Ziduri de conducere ===============

  // fisurare
  let ponder_zc_fisurare = 0.37
  let ilim_zc_fisurare = 5

  let Ii_zc_fisurare = 0

  secInv.forEach((s, index) => {
    Ii_zc_fisurare += ( fVal(s.sidewall_left_horiz_length) +  fVal(s.sidewall_right_horiz_length) + fVal(s.sidewall_left_vert_length) + fVal(s.sidewall_right_vert_length) ) / sectorsLength[index]
  })

  sum += ponder_zc_fisurare * Math.min( Ii_zc_fisurare / ilim_zc_fisurare , 1 )

  // desprindere
  let ponder_zc_desprindere = 1.9
  let ilim_zc_desprindere = 1

  let Ii_zc_desprindere = 0

  secInv.forEach((s, index) => {
    Ii_zc_desprindere += ( fVal(s.sidewall_left_displaced) +  fVal(s.sidewall_left_displaced) ) * sectorsLength[index] / 2
  })

  Ii_zc_desprindere = Ii_zc_desprindere/ (100 * sectorsTotalLenght)

  sum += ponder_zc_desprindere * Math.min( Ii_zc_desprindere / ilim_zc_desprindere , 1 )

  // eroziune
  let ponder_zc_eroziune = 1.01
  let ilim_zc_eroziune = 50

  let Ii_zc_eroziune = 0

  secInv.forEach((s, index) => {
    Ii_zc_eroziune += ( fVal(s.sidewall_left_abrasion_deep) +  fVal(s.sidewall_left_abrasion_percent) + fVal(s.sidewall_right_abrasion_deep) +  fVal(s.sidewall_right_abrasion_percent) ) * sectorsLength[index] / 2
  })

  Ii_zc_eroziune = Ii_zc_eroziune/(100 * sectorsTotalLenght)

  sum += ponder_zc_eroziune * Math.min( Ii_zc_eroziune / ilim_zc_eroziune , 1 )

  // ============ Pinteni ===============

  // fisurare
  let ponder_pinteni_fisurare = 0.2
  let ilim_pinteni_fisurare = 5

  let Ii_pinteni_fisurare = 0
  let total_pinteni_avariati = 0

  secInv.forEach((sectorInventory, sectorIndex) => {

    let bp_backup = fVal(sec[sectorIndex].apron_width) + 4 * fVal(sec[sectorIndex].sector_deep)

    sectorInventory.spurs.forEach((spurInventory, spurIndex) => {
      let spur_crak_length = fVal(spurInventory.spur_horiz_craks_lenght) + fVal(spurInventory.spur_vert_craks_lenght)
      if(spur_crak_length){
        total_pinteni_avariati++
        let bp = fVal(sec[sectorIndex].spurs[spurIndex].spur_length) || bp_backup

        if(bp){
            Ii_pinteni_fisurare += spur_crak_length/bp
        }
      }
    })
  })

  sum += ponder_pinteni_fisurare * Math.min( Ii_pinteni_fisurare/ ilim_pinteni_fisurare , 1 )

  // desprindere aripi
  let ponder_pinteni_desp_aripi = 0.46
  let ilim_pinteni_desp_aripi = 1

  let Ii_pinteni_desp_aripi = 0

  secInv.forEach((sectorInventory, sectorIndex) => {
    sectorInventory.spurs.forEach((spurInventory, spurIndex) => {
      Ii_pinteni_desp_aripi += (fVal(spurInventory.spur_displaced_left) + fVal(spurInventory.spur_displaced_right))/(2 * 100)
    })
  })

  sum += ponder_pinteni_desp_aripi * Math.min( Ii_pinteni_desp_aripi / ilim_pinteni_desp_aripi, 1)

  // desprindere zona centrala
  let ponder_pinteni_desp_z_centrala = 0.72
  let ilim_pinteni_desp_z_centrala = 1

  let Ii_pinteni_desp_z_centrala = 0

    secInv.forEach((sectorInventory, sectorIndex) => {
      sectorInventory.spurs.forEach((spurInventory, spurIndex) => {
        Ii_pinteni_desp_z_centrala += fVal(spurInventory.spur_displaced_center) / 100
      })
    })

  sum += ponder_pinteni_desp_z_centrala * Math.min( Ii_pinteni_desp_z_centrala / ilim_pinteni_desp_z_centrala , 1 )

  // eroziune
  let ponder_pinteni_eroziune = 0.29
  let ilim_pinteni_eroziune = 50


  let Ii_pinteni_eroziune = 0

    secInv.forEach((sectorInventory, sectorIndex) => {
      sectorInventory.spurs.forEach((spurInventory, spurIndex) => {
        Ii_pinteni_eroziune += fVal(spurInventory.spur_abrasion_deep) * fVal(spurInventory.spur_abrasion_percent) / 100
      })
    })

  sum += ponder_pinteni_eroziune * Math.min( Ii_pinteni_eroziune / ilim_pinteni_eroziune , 1 )

  // ============ Pinten terminal ===============
  if(construction.cd.has_final_spur){

    let fsInv = inventory.final_spur

    let fs = construction.cd.final_spur

    let Hz = fVal(fs.sidewall_height)


    // decastrare
    let ponder_pt_decastrare = 0.12
    let ilim_pt_decastrare = 1

    let Ii_pt_decastrare = Hz ? (fVal(fsInv.final_spur_decastr_left) + fVal(fsInv.final_spur_decastr_right)) / Hz : 0

    sum += ponder_pt_decastrare * Math.min( Ii_pt_decastrare / ilim_pt_decastrare , 1 )

    // fisurare
    let ponder_pt_fisurare = 0.63
    let ilim_pt_fisurare = 5

    let Ii_pt_fisurare = fVal(fs.spur_length) ? ( fVal(fsInv.final_spur_horiz_craks_lenght) + fVal(fsInv.final_spur_horiz_craks_lenght) ) / fVal(fs.spur_length) : 0

    sum += ponder_pt_fisurare * Math.min( Ii_pt_fisurare / ilim_pt_fisurare , 1 )

    // afuiere
    let ponder_pt_afuiere = 0.55
    let ilim_pt_afuiere = 1

    let Ii_pt_afuiere = fVal(fsInv.final_spur_afuieri_height) * fVal(fsInv.final_spur_afuieri_percent) / 100

    sum += ponder_pt_afuiere * Math.min( Ii_pt_afuiere / ilim_pt_afuiere , 1 )

    // desprindere aripi
    let ponder_pt_desp_aripi = 1.12
    let ilim_pt_desp_aripi = 1

    let Ii_pt_desp_aripi = ( fVal(fsInv.final_spur_displaced_left) + fVal(fsInv.final_spur_displaced_right) ) / (2*100)

    sum += ponder_pt_desp_aripi * Math.min( Ii_pt_desp_aripi / ilim_pt_desp_aripi , 1 )

    // desprindere zona centrala
    let ponder_pt_desp_z_centrala = 1.38
    let ilim_pt_desp_z_centrala = 1

    let Ii_pt_desp_z_centrala = fVal(fsInv.final_spur_displaced_center) / 100

    sum += ponder_pt_desp_z_centrala * Math.min( Ii_pt_desp_z_centrala / ilim_pt_desp_z_centrala , 1 )

    // eroziune
    let ponder_pt_eroziune = 0.80
    let ilim_pt_eroziune = 50

    let Ii_pt_eroziune = fVal(fsInv.final_spur_abrasion_deep) * fVal(fsInv.final_spur_abrasion_percent) / 100

    sum += ponder_pt_eroziune * Math.min( Ii_pt_eroziune / ilim_pt_eroziune , 1 )

  }

  let YaRef = 32.20

  let ys = 100 - ( 1000 * Math.sqrt(sum) )/ YaRef

  return ys.toFixed(2)
}
// get the float val or 0 if not numeric
function fVal(x){
  return parseFloat(x) || 0
}

module.exports = ys
