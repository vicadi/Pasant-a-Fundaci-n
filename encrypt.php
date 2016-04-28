<?php


$key = "CA7376561BB1CC5BFF78D871BAC964DD";
$code = "GwD412r7";
$valor=$argv[1];
$idComercio = '7';
$idTipoTransaccion = "1";
$pagos = "1";
$idConcepto = "Donacion";
$idProducto = "1006";
$impuesto = "16";
$valorImpuesto = "0";
$concepto = "Donacion unica";
$moneda = "COP ";
$urlComercio = "http://conexionbienestar.com";
$urlConfirmacion = "http://conexionbienestar.com/respuestaAddCelColombia";

$cadena= $moneda.'^'.$idComercio.'^'.$idConcepto.'^'.$code.'^'.$valor.'';


$certificado=base64_encode(tobin(md5($cadena)));

$data ='{"idComercio":'.$idComercio.',"idTipoTransaccion":'.$idTipoTransaccion.',"pagos":'.$pagos.',"idProducto":"'
.$idProducto.'","idConcepto":"'.$idConcepto.'","concepto":"'.$concepto.'","valor":'.$valor.',"impuesto":'.$impuesto.
',"valorImpuesto":'.$valorImpuesto.',"moneda":"'.$moneda.'","secureCode":"'.$code.'","certificado":"'
.$certificado.'","urlComercio":"'.$urlComercio.'" ,"urlConfirmacion":"'.$urlConfirmacion.'"}';


if($valor>0){
echo encrypt3DES(tobin($key),$data);
}

function encrypt3DES($key, $text){
    $td = mcrypt_module_open (MCRYPT_3DES, '', MCRYPT_MODE_CBC, '');
    //Vector 
     $vector=str_repeat("\0",8);
    // Complete the key
    $key_add = 24-strlen($key);
    $key .= substr($key,0,$key_add);

    // Padding the text
    $text_add = strlen($text)%8;
    for($i=$text_add; $i<8; $i++){
        $text .= chr(8-$text_add);
    }

    mcrypt_generic_init ($td, $key, $vector);
    $encrypt64 = mcrypt_generic ($td, $text);
    mcrypt_generic_deinit($td);
    mcrypt_module_close($td);

     // Return the encrypt text in 64 bits code
    return base64_encode($encrypt64);
}

function tobin( $target ) {
    $ret = '';

    for ( $i = 0; $i < strlen($target)-1; $i += 2 ) {
        $char=chr( hexdec( $target{ $i + 1 } ) + hexdec( $target{ $i } ) * 16 );        
        $ret .= $char;   
    }
    return $ret;
}

?> 