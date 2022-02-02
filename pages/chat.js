import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Como fazer AJAX: https://medium.com/@omariosouto/entendendo-como-fazer-ajax-com-a-fetchapi-977ff20da3c6
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzY4OTk3MCwiZXhwIjoxOTU5MjY1OTcwfQ.6573bF3uDhbDiiaeJN7lcbXa6abLaYRQBaX_dCs2G6U';
const SUPABASE_URL = 'https://zrontyfvgydkykxtfvzb.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function ChatPage() {
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]); // lista de array vazia

    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                console.log("Dados da consulta", data);
                setListaDeMensagens(data);
            })
    }, []);

    /*
    // Usuário
    - Usuário digita no campo textarea
    - Aperta enter para enviar
    - Criar um botão para enviar a mensagem (desafio)
    - Adicionar um botão para excluir a msg do chat (desafio - dica: usar filter no array ao inves do map)
    - Colocar um loading enquanto aguarda a msg no userEffect (desafio)
    - Mouse hover na imagem do usuario, quando passar o mouse abrir o profile com link do github, informações da api, entre outras info. (Desafio)
    - Mandar pool, enquete, mandar imagem, anexo, entre outras opções (desafio)
    - Tem que adicionar o texto na listagem
    
    // Dev
    - [X] Campo criado
    - [X] Vamos usar o onChange usa o useState (ter if pra caso seja enter pra limpar a variavel)
    - [X] Lista de mensagens 
    */

    // Sua lógica vai aqui

    // ./Sua lógica vai aqui

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            // id: listaDeMensagens.length + 1,
            de: 'vanessametonini',
            msg: novaMensagem,
        }

        // Tem que ser um objeto com os MESMOS CAMPOS que você escreveu no SUPABASE
        supabaseClient
            .from('mensagem')
            .insert([
                mensagem
            ])
            .then(({ data }) => {
                console.log('criando msg', data);
                // chamada de back-end
                setListaDeMensagens([
                    data[0],
                    ...listaDeMensagens,
                ])
            });
        setMensagem('');
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    <MessageList mensagens={listaDeMensagens} />
                    {/* {listaDeMensagens.map((mensagemAtual) => {
                        return (
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de}: {mensagemAtual.msg}
                            </li>
                        )
                    }
                    )} */}


                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            // arrow function
                            onChange={(event) => {
                                // onde está o valor ?
                                const valor = event.target.value;
                                // trocar o valor da variavel
                                setMensagem(valor);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault(); // previne o evento padrao do enter
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <Button iconName="arrowRight"   // botão para enviar msg
                            value={mensagem}
                            onClick={(event) => {
                                // onde está o valor ?
                                const valor = event.target.value;
                                // trocar o valor da variavel
                                setMensagem(valor);
                                handleNovaMensagem(mensagem);
                            }}
                            buttonColors={{
                                contrastColor: '#CBD2D9',
                                mainColor: '#181F25',
                                mainColorLight: '#212931',
                                mainColorStrong: '#212931'
                            }}
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                //backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginBottom: '7px',
                                // color: appConfig.theme.colors.neutrals[200],
                                // hover: {
                                //    backgroundColor: appConfig.theme.colors.neutrals[700],
                                //}
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    // console.log('MessageList', props.listaDeMensagens);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',   // barra de rolagem na página do chat
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Button iconName="trash"
                                buttonColors={{
                                    contrastColor: '#CBD2D9',
                                    mainColor: '#181F25',
                                    mainColorLight: '#212931',
                                    mainColorStrong: '#212931'
                                }}
                                styleSheet={{
                                    width: '100%',
                                    border: '0',
                                    resize: 'none',
                                    marginLeft: '691px',
                                    borderRadius: '5px',
                                    padding: '6px 8px',
                                    //backgroundColor: appConfig.theme.colors.neutrals[800],
                                    marginBottom: '7px',
                                    hover: {
                                        backgroundColor: appConfig.theme.colors.neutrals[600],
                                    }
                                }}
                            />
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>
                            <Text
                                tag="span"
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {mensagem.msg}
                    </Text>
                )
            })}
        </Box>
    )
}