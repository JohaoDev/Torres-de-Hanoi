<?php
include_once('../controladores/ControladorBase.php');
class Controlador_juego
{

    public $torreA;
    public $torreB;
    public $torreC;
    
    function __construct(){
        $this->torreA = array();
        $this->torreB = array();
        $this->torreC = array();
    }

    private function fijarPosicion($posicion){
        $this->torreA = $posicion->A;
        $this->torreB = $posicion->B;
        $this->torreC = $posicion->C;
    }

    private function devolverPosicion(){
        return ["A"=>$this->torreA,"B"=>$this->torreB,"C"=>$this->torreC];
    }

    private function mover($desde, $hacia){
        $torreDesde = 'torre'.$desde;
        $torreHacia = 'torre'.$hacia;
        array_push($this->$torreHacia, $this->$torreDesde[0]);
        rsort($this->$torreDesde);
        array_splice($this->$torreDesde, count($this->$torreDesde)-1);
        sort($this->$torreDesde);
        sort($this->$torreHacia);
    }

    function iniciar($args){
        $numero_discos = $args["numero_discos"];
        $discos = array();
        for($i = 1; $i<=$numero_discos; $i++){
            array_push($discos, $i);
        }
        return ["A"=>$discos,"B"=>array(),"C"=>array()];
    }

    function movimiento($args){
        $desde = $args["desde"];
        $hacia = $args["hacia"];
        $desde = strtoupper($desde);
        $hacia = strtoupper($hacia);
        $posicion = json_decode($args["posicion"]);
        $this->fijarPosicion($posicion);
        $torreDesde = 'torre'.$desde;
        $torreHacia = 'torre'.$hacia;
        if(!($desde == 'A' || $desde == 'B' || $desde == 'C')){
            return false;
        }
        if(!($hacia == 'A' || $hacia == 'B' || $hacia == 'C')){
            return false;
        }
        if($this->$torreDesde == $this->$torreHacia){
            return false;
        }
        if($this->$torreDesde == []){
            return false;
        }
        if($this->$torreHacia == []){
            $this->mover($desde, $hacia);
            return $this->devolverPosicion();
        }
        if($this->$torreDesde[0] < $this->$torreHacia[0]){
            $this->mover($desde, $hacia);
            return $this->devolverPosicion();
        }
        return false;
    }
}