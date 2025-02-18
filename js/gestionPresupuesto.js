// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGastos = 0;

function actualizarPresupuesto(num) {
    // TODO
    if(num >= 0 && typeof num === 'number')
    {
        presupuesto = num;
        return presupuesto;
    }
    else
    {
        console.log('ERROR, el numero introducido es negativo');
        return -1;
    }
}

function mostrarPresupuesto() {
    // TODO
    return 'Tu presupuesto actual es de '+presupuesto+' €';
}

function CrearGasto(descripcion,valor,fecha = Date.now(), ...etiquetas) 
{
    // TODO
    this.descripcion = descripcion;
    this.etiquetas = [...etiquetas];

    if(valor > 0 && !isNaN(valor))
    {
        this.valor = valor;
    }
    else
    {
        this.valor = 0;
    };

    if(typeof fecha === 'string' && !isNaN(Date.parse(fecha)))
    {
        this.fecha = Date.parse(fecha);    
    }
    else
    {
        this.fecha = Date.now();
    };

    this.actualizarValor = function(nwvalor)
    {
        if(nwvalor >= 0)
        {
            this.valor = nwvalor
        }
        else
        {
            console.log('El valor introducido no es valido, no ha podido ser cambiado')
        };
    };
    
    this.actualizarDescripcion = function(nwdesc)
    {
        this.descripcion = nwdesc;
    };

    this.actualizarFecha = function(nwfecha)
    {
        if(typeof nwfecha === 'string' && !isNaN(Date.parse(nwfecha)))
        {
            this.fecha = Date.parse(nwfecha);    
        }
        else
        {
            console.log('La fecha introducida no es valida, no ha podido ser cambiada');
        }
    };

    this.anyadirEtiquetas = function(...new_etiq)
    {
        let ret = [...new Set([...this.etiquetas, ...new_etiq])];
        this.etiquetas = ret;
    };

    this.borrarEtiquetas = function(...etiq)
    {
        // let j = 0
        // for(let i = 0; i < this.etiquetas.length; i++)
        // {
        //     while(j < etiq.length)
        //     {
        //         if(etiq[j]===this.etiquetas[i])
        //         {
        //             this.etiquetas.splice(i,1);
        //             j++;
        //         }
        //     }
        // };
        etiq.forEach(borrar => {
            let pos = this.etiquetas.indexOf(borrar);
            if(pos != -1)
            {
                this.etiquetas.splice(pos,1);
            }
        });
    };

    this.mostrarGasto = function()
    {
        return "Gasto correspondiente a " +this.descripcion+" con valor "+this.valor+" €";
    };

    this.mostrarGastoCompleto = function()
    {
        let fechita = new Date(this.fecha);
        let ret = "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €.\nFecha: " + fechita.toLocaleString() + "\nEtiquetas:\n";
        for(let i = 0; i < etiquetas.length; i++)
        {
            ret += '- ' + etiquetas[i]+'\n';
        };
        return ret;
    };

    this.obtenerPeriodoAgrupacion = function(tipo)
    {
        let yep = new Date(this.fecha);
        
        let anyo = yep.getFullYear();
        let mes = 0;
        let temp1 = yep.getMonth()+1;
        let dia = 0;
        let temp2 = yep.getDate();
        if(temp1 <= 9)
        {
            mes = '0' + temp1; 
        }
        else
        {
            mes = temp1;
        }
        if(temp2 <= 9)
        {
            dia = '0' + temp2;
        }
        else
        {
            dia = temp2;
        }
        if(tipo === 'anyo')
        {
            return anyo;
        }
        if(tipo === 'mes')
        {
            return anyo + '-' + mes;
        }
        if(tipo === 'dia')
        {
            return anyo + '-' + mes + '-' + dia;
        }
    }
}

function listarGastos()
{
    return gastos;
}

function anyadirGasto(gast)
{
    gast.id = idGastos;
    idGastos++;
    gastos.push(gast);
}

function borrarGasto(gID)
{
    for(let i = 0; i < gastos.length; i++)
    {
        if(gID === gastos[i].id)
        {
            gastos.splice(i,1);
        }
    }
}

function calcularTotalGastos()
{
    let total = 0;
    for(let i = 0; i < gastos.length; i++)
    {
        total = total + gastos[i].valor;
    };
    return total;
}

function calcularBalance()
{
    return presupuesto - calcularTotalGastos();
}


function filtrarGastos({fechaDesde, fechaHasta, valorMinimo, valorMaximo, descripcionContiene, etiquetasTiene})
{
    
    let arrayFiltrado = gastos.filter(function(gasto){

        let fechaDvalida = true;
        let fechaHvalida = true;
        let valorMinvalido = true;
        let valorMaxvalido = true; 
        let descripcionvalida = true;
        let etiquetasvalida = true;

        if(fechaDesde !== undefined)
        {
            if(Date.parse(fechaDesde) == isNaN || Date.parse(fechaDesde) > gasto.fecha)
            {
                fechaDvalida = false;
            }
        }
        if(fechaHasta !== undefined)
        {
            if(Date.parse(fechaHasta) == isNaN || Date.parse(fechaHasta) < gasto.fecha)
            {
                fechaHvalida = false;
            }   
        }
        if(valorMinimo != undefined)
        {
            if(valorMinimo > gasto.valor)
            {
                valorMinvalido = false;
            }   
        }
        if(valorMaximo != undefined)
        {
            if(valorMaximo < gasto.valor)
            {
                valorMaxvalido = false;
            }    
        }

        if(descripcionContiene)
        {
            let desc = gasto.descripcion.toUpperCase();
            let contiene = descripcionContiene.toUpperCase();
            if(!desc.includes(contiene))
            {
                descripcionvalida = false;
            }
        }

        if(etiquetasTiene)
        {
            let xd = false;
            for(let i = 0; i < etiquetasTiene.length; i++)
            {
                for(let j = 0; j < gasto.etiquetas.length; j++)
                {
                    if(etiquetasTiene[i] === gasto.etiquetas[j])
                    {
                        xd = true;
                    }
                }
            }
            if(xd === false)
            {
                etiquetasvalida = false;
            }
        }
        
        if(fechaDvalida && fechaHvalida && valorMinvalido && valorMaxvalido && descripcionvalida && etiquetasvalida)
        {
            return true;
        }
        else
        {
            return false;
        }
    });

    return arrayFiltrado;
}


function agruparGastos(periodo = 'mes', etiquetas, fechaD, fechaH)
{

    let arrFilt = filtrarGastos({fechaDesde: fechaD, fechaHasta: fechaH, etiquetasTiene: etiquetas});

    // let arrayAgrupado = arrFilt.reduce(function(acu, gasto){
    //     if(typeof arrFilt[acu[gasto.obtenerPeriodoAgrupacion(periodo)]] != 'number')
    //     {
    //         arrFilt[acu[gasto.obtenerPeriodoAgrupacion(periodo)]] = 0;
    //     }
    //     console.log(arrFilt[acu[gasto.obtenerPeriodoAgrupacion(periodo)]]);
    //     arrFilt[acu[gasto.obtenerPeriodoAgrupacion(periodo)]] += gasto.valor;
    //     return acu;
    // },{});

    let arrayAgrupado = arrFilt.reduce((acu,gasto)=>{
        let fecha = gasto.obtenerPeriodoAgrupacion(periodo);
        
        if(acu[fecha] == undefined)
        {
            acu[fecha] = gasto.valor;
        }
        else
        {
            acu[fecha] += gasto.valor;
        }
        return acu;
    },{});

    return arrayAgrupado;
}

function transformarListadoEtiquetas(etiquetasTiene){
    let etiquetasTransf = etiquetasTiene.match(/[a-z0-9]+/gi);
    return etiquetasTransf;
}

function cargarGastos(gastosAlmacenamiento) {
    // gastosAlmacenamiento es un array de objetos "planos"
    // No tienen acceso a los métodos creados con "CrearGasto":
    // "anyadirEtiquetas", "actualizarValor",...
    // Solo tienen guardadas sus propiedades: descripcion, valor, fecha y etiquetas
  
    // Reseteamos la variable global "gastos"
    gastos = [];
    // Procesamos cada gasto del listado pasado a la función
    for (let g of gastosAlmacenamiento) {
        // Creamos un nuevo objeto mediante el constructor
        // Este objeto tiene acceso a los métodos "anyadirEtiquetas", "actualizarValor",...
        // Pero sus propiedades (descripcion, valor, fecha y etiquetas) están sin asignar
        let gastoRehidratado = new CrearGasto();
        // Copiamos los datos del objeto guardado en el almacenamiento
        // al gasto rehidratado
        // https://es.javascript.info/object-copy#cloning-and-merging-object-assign
        Object.assign(gastoRehidratado, g);
        // Ahora "gastoRehidratado" tiene las propiedades del gasto
        // almacenado y además tiene acceso a los métodos de "CrearGasto"
          
        // Añadimos el gasto rehidratado a "gastos"
        gastos.push(gastoRehidratado)
    }
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto, 
    borrarGasto, 
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos,
    transformarListadoEtiquetas,
    cargarGastos
}