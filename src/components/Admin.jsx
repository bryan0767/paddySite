import React from 'react'
import Confirm from './Confirm'
import { Modal, TextInput, Button, Collection, CollectionItem, Breadcrumb, Switch, Tabs, Tab } from 'react-materialize'

export default class Admin extends React.Component {
    constructor(props) {
      super(props);
      this.defaultDisplay = [
        { name:"Edit Menu", action:"edit" },
        { name:"Settings", action:"settings"},
        { name:"News Letter Members", action:"members"},
        { name:"Images", action:"images"}
      ]
      this.defaultActions = [
        <Button modal="close"  style={{"marginRight": "20px"}}>Close</Button>
      ]
      this.state = {
        menu:[],
        crumbs:[],
        images:[],
        request: {},
        newEntry: {},
        currentItem:{},
        username:"",
        password:"",
        section:"images",
        // section:"main",
        prices:true,
        // validated:false,
        validated:true,
        showEdit:false,
        display:this.defaultDisplay,
        actions:[
          <Button type="submit" onClick={ () => this.validateEmail(event, 'submit') } style={{"marginRight":"10px"}}>Login</Button>,
          <Button modal="close"  style={{"marginRight": "20px"}}>Close</Button>
        ],
        replacedImage:{},
        selectedImage:{},
        selectedValue:{}
      }
    }

    fetchPrices = () => {
      fetch("/api/get?id=7")
          .then(blob=>blob.json())
          .then(data => {
            this.setState({
              prices:data.show_prices == 1 ? true : false,
              currentItem:{},
              display:[],
              section:"settings",
              crumbs:[{name:"Settings", action:"nothing"}]
            })
          })
    }

    fetchImages = () => {
      fetch("/api/getImages")
           .then(blob => blob.json())
           .then(x => {
            this.setState({
              currentItem:{},
              display:[],
              section:"images",
              crumbs:[{name:"Images", action:"nothing"}],
              images:[...x]
            })
           })
    }

    populateMenu = (data, action="admin") => {
      switch(action) {
        case "edit":
          this.fetchData(data);
        break;
        case "settings":
          this.fetchPrices();
        break;
        case "menu":
          this.setState({
            showEdit:true
          })
          this.getContent(data, 'sub_id')
        break;
        case "submenu":
        this.setState({
          showEdit:false
        })
          this.getContent(data, 'super_sub_id')
        break;
        case "item":
          this.getContent(data, 'item_id')
        break;
        case "members":
          this.getMembers()
        break;
        case "nothing":
        break;
        case "images":
          this.fetchImages()
        break;
        default:
          this.setState({
            crumbs: [],
            newEntry: {},
            currentItem: {},
            display:this.defaultDisplay,
            actions: this.defaultActions,
            section:"main",
            showEdit:false
          })
        break;
      }
    }

    fetchData = (root) => {
      let new_actions = [<Button modal="close"  style={{"marginRight": "20px"}}>Close</Button>]

      fetch("api/get?id=7")
      .then(blob => blob.json())
      .then(data => {
        this.setState({
          menu: [...data.data],
          crumbs: [...[], root],
          section:"main",
          showEdit:true
        }, () => {
          new_actions.unshift(
            <Modal header="New Menu Section"
              actions={
                [
                  <Confirm
                           header="Confirm"
                           buttonText="Save"
                           text="Are you sure you wish to add this section?"
                           modalStyles={{ "display":"inline", "marginLeft":"10px"}}
                           actions={
                                    [<Button modal="close" onClick={() => this.addNewItem( data )} style={{"marginRight":"10px"}}>Yes, Create</Button>,
                                     <Button modal="close">Cancel</Button>]
                                     }>Save</Confirm>,
                <Button modal="close" style={{"margin": "0 20px"}}>Close</Button>
                ]
              }
              trigger={
                <Button style={{ "marginRight":"20px" }}>Add New</Button>
                    }>
                    {
                      data.data_schema.map(x => {
                        return <div>
                                <label htmlFor={x}>{x}</label>
                                <TextInput id={x} placeholder={x} value={this.state.newEntry[ `${x}` ]} onChange={() => this.changeItem(event, x, 'newEntry')}></TextInput>
                               </div>
                      })
                    }
            </Modal>
          )
            this.setState(state => ({
              display:state.menu,
              actions:new_actions
            }))
        })
      })
    }

    getContent = (data, request_id) => {

      let new_request = this.state.request;
      let new_actions = [<Button modal="close"  style={{"marginRight": "20px"}}>Close</Button>]
      new_request[request_id] = data['id'];

      this.setState(state => ({
        request: new_request
      }))

      if(data.data) {

        new_actions.unshift(
          <Modal header="New Item"
                 trigger={<Button style={{ "marginRight":"20px" }}>Add New</Button>}
                  actions={[
                    <Confirm
                             header="Confirm"
                             buttonText="Save"
                             text="Are you sure you wish to add this?"
                             modalStyles={{ "display":"inline", "marginLeft":"10px"}}
                             actions={
                                      [<Button modal="close" onClick={() => this.addNewItem(data)} style={{"marginRight":"10px"}}>Yes, Create</Button>,
                                       <Button modal="close">Cancel</Button>]
                                       }>Save</Confirm>,
                    <Button modal="close" style={{"margin": "0 20px"}}>Cancel</Button>
                  ]}>
                      {
                        data.data_schema.map(x => {
                          return <div>
                                  <label htmlFor={x}>{x}</label>
                                  <TextInput id={x} placeholder={x} value={this.state.newEntry[ `${x}` ]} onChange={() => this.changeItem(event, x, 'newEntry')}></TextInput>
                                 </div>
                        })
                      }
          </Modal>
        )

        // makes it here if there is data array

        if(!this.state.crumbs.includes(data)) {
          this.setState( state => ({
            display:data.data,
            crumbs:[...state.crumbs, data],
            actions: new_actions,
            section:'main'
          }))
        } else {
            if(this.state.crumbs.indexOf(data) != this.state.crumbs.length - 1) {
              this.setState(state => ({
                display:data.data,
                crumbs: state.crumbs.slice(0, state.crumbs.indexOf(data) + 1),
                actions: new_actions,
                section:'main'
              }))
          } else {
            if(!this.state.display.length) {
              this.setState({
                display: data.data,
                currentItem: {},
                actions: new_actions,
                section:'main'
              })
            } else {
              if(this.state.section != "main") {
                this.setState({
                  display: data.data,
                  currentItem: {},
                  actions: new_actions,
                  section:'main'
                })
              }
            }
          }
        }
      } else {

        // makes it here if no data array

        this.setState(state => ({
          display:[],
          currentItem: data,
          actions: new_actions,
          section:"item",
          showEdit:false
        }))

      }
    }

    getMembers = (x = false) => {
    let new_actions = [
      <Button onClick={() => this.getMembers(true)} style={{ "marginRight":"10px" }}>Export as CSV</Button>,
      <Button modal="close"  style={{"marginRight": "20px"}}>Close</Button>
    ]

    if(!x) {
      fetch("/api/getMembers")
          .then(blob => blob.json())
          .then(res => {
            let data = res.map(x =>{
               x['name'] = x['email']
               x['action'] = "nothing"
               return x;
            })
            this.setState({
              section:"main",
              display: data,
              actions:new_actions,
              crumbs: [
                {name:`Total Members: ${data.length}`, action:'nothing'}
              ]
            })
          })
        } else {
          window.location.href="/api/exportMembers"
        }
    }

    addNewItem = (data) => {
      let newEntry = this.state.newEntry;
      let request = this.state.request;
      let url;

      newEntry['id'] = data.data.length > 0 ? Math.max(...data.data.map(x => x.id)) + 1 : 1;
      newEntry['data'] = [];

      if(data.action == "main") {
        newEntry['action'] = "menu";
        newEntry['data_schema'] = ['name', 'subtitle']
        url = "newSection"
      } else if(data.action == 'menu') {
        newEntry['action'] = "submenu";
        newEntry['data_schema'] = ['name', 'price', 'text', 'sub_text']
        url = "newSubSection"
      } else if(data.action = "submenu") {
        delete newEntry['data']
        delete newEntry['data_schema']
        newEntry['action'] = "item";
        url = "newItem"
      }

      request['id'] = '7';
      request['data'] = newEntry
      fetch(`/api/${url}`, {
        method:"POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      }).then(res => {
        M.toast({html: "Successfully added!", classes: "rounded teal"})
        this.populateMenu({}, "default");
      })
    }

    validateEmail = (e, key) => {
      if(key != "submit") {
        this.setState({
          [key]: e.target.value
        })
      } else {
        fetch(`/api/validate?username=${this.state.username}&password=${this.state.password}`)
            .then(blob => blob.json())
            .then(res => {
              if(res) {
                this.setState({
                  validated:true,
                  actions:this.defaultActions
                }, () => {
                  // var d = new Date();
                  // d.setTime(d.getTime() + (1*24*60*60*1000));
                  // let expires = "expires="+ d.toUTCString();
                  // document.cookie = "admin=true;" + expires + ";path=/";
                })
              } else {
                M.toast({html: "Incorrect username or password entered", classes: "rounded red darken-3"})
              }
            })
        }
      }

      submitForm = (form) => {
        // console.log(form, 'in the submit function')
      }

      renderItemInputs = (type=false) => {
        // let replacedImage;
        // let selectedImage;

        if(this.state.section == "settings" ) {
          return <div style={{"margin":"20px 0"}}>
                  <label htmlFor="priceSwitch" style={{"fontSize": "12px"}}>Show Menu Prices</label>
                  <Switch checked={this.state.prices == true} offLabel="Hide" onLabel="Show" id="priceSwitch" onChange={() => this.changePriceView({}, "none")}/>
                  <Button onClick={() => this.changePriceView({}, "request")} style={{"margin": "20px 0"}}>Save</Button>
                </div>
        } else if (this.state.section == "images") {
          return <Tabs className="tab-demo z-depth-1">
                    <Tab title="upload new">
                      <div className="inputGrid">
                      <TextInput
                       className="fileInput"
                       onChange={(e, image) => {
                         if(e.currentTarget.files[0]) {
                           let formData = new FormData();
                           formData.append('upload', e.currentTarget.files[0])
                           fetch("api/uploadImage", {
                             method:"POST",
                             body: formData
                           }).then(res => {
                             M.toast({html: "Image Updated!", classes: "rounded teal"})
                             this.populateMenu({}, "default");
                           })

                           fetch("api/newImage", {
                             method:"POST",
                             headers: {
                                 'Accept': 'application/json',
                                 'Content-Type': 'application/json'
                             },
                             body: JSON.stringify({
                               file: {
                                 name: e.currentTarget.files[0].name,
                                 lastModified: e.currentTarget.files[0].lastModified,
                                 lastModifiedDate: e.currentTarget.files[0].lastModifiedDate,
                                 webkitRelativePath: e.currentTarget.files[0].webkitRelativePath,
                                 size: e.currentTarget.files[0].size,
                                 type: e.currentTarget.files[0].type
                               },
                               old_data: {},
                               update:false
                             })
                           })

                         }
                       }}
                       id={`newFileInput`}
                       label="Upload New"
                       name="upload"
                       type="file" />
                      </div>
                    </Tab>
                      {
                        this.props.data.filter(x => x.images.length > 0).map((x, z) => {
                          return <Tab
                                  options={{
                                    duration: 300,
                                    onShow: null,
                                    responsiveThreshold: Infinity,
                                    swipeable: false
                                  }}
                                  title={x.type}>
                                  <div style={{ "justifyContent":"space-between", "display":"flex", "flexFlow":"row wrap" }}>
                                      {
                                        x.images.map((y, a) => {
                                          return <div className=" col s4 " style={{ marginTop:"20px", display:"flex", flexDirection:"column",
                                                                                    padding:"0", maxWidth:"32%", justifyContent:"center" }}>
                                                    <img src={y.src} style={{ width:"100%", height:"auto" }}/>

                                                    <Modal  header="Choose new Image"
                                                            options={{onOpenStart: () => {
                                                              this.setState({
                                                                replacedImage:y
                                                              })
                                                            }}}
                                                            actions={
                                                              [
                                                                <Confirm header="Confirm"
                                                                         buttonText="Save"
                                                                         text="Are you sure you wish to replace this image?"
                                                                         modalStyles={{ "display":"inline", "marginLeft":"10px"}}
                                                                         actions={
                                                                                  [<Button modal="close" onClick={() => {
                                                                                    // post request
                                                                                    fetch("api/updateImage", {
                                                                                      method:"POST",
                                                                                      headers: {
                                                                                        'Accept': 'application/json',
                                                                                        'Content-Type': 'application/json'
                                                                                      },
                                                                                      body: JSON.stringify({
                                                                                        old_data:this.state.replacedImage,
                                                                                        new_data:this.state.selectedImage
                                                                                      })
                                                                                    }).then(res => {
                                                                                      M.toast({html: "Image Updated!", classes: "rounded teal"})
                                                                                      this.populateMenu({}, "default");
                                                                                    })

                                                                                  }} style={{"marginRight":"10px"}}>Yes, Replace</Button>,
                                                                                   <Button modal="close">Cancel</Button>]
                                                                                   }>Save</Confirm>,
                                                              <Button modal="close" style={{"margin": "0 20px"}} onClick={ () => {
                                                                this.setState({
                                                                  selectedImage:{}
                                                                })
                                                                let images = document.querySelectorAll(".select_image")
                                                                images.forEach(x => x.style.border = "none")
                                                              } }>Close</Button>
                                                              ]
                                                            }
                                                            trigger={<Button style={{ "marginTop":"10px" }}>Replace</Button>}>
                                                              <div style={{ "justifyContent":"space-between", "display":"flex", "flexFlow":"row wrap" }}>
                                                                {
                                                                  this.state.images.map((x, y) => {
                                                                    return <div className=" col s4 " style={{ marginTop:"20px", display:"flex", flexDirection:"column",
                                                                                                              padding:"0", maxWidth:"32%", justifyContent:"center" }}>
                                                                                <img className="select_image" src={x.src} style={{ height:"auto", width:"100%" }} onClick={(e) => {
                                                                                              e.target.style.border = e.target.style.border == "5px solid #1f5121" ? "none" : "5px solid #1f5121"
                                                                                              this.setState({
                                                                                                selectedImage: x
                                                                                              })
                                                                                              let images = document.querySelectorAll(".select_image")
                                                                                              images.forEach(x => {
                                                                                                if(x != e.target) {
                                                                                                  x.style.border = "none"
                                                                                                }
                                                                                              })
                                                                                          }}/>
                                                                    </div>
                                                                  })
                                                                }
                                                                </div>
                                                    </Modal>

                                                    <div className="inputGrid">
                                                      <TextInput
                                                       data-id={ y.src }
                                                       className="fileInput"
                                                       onChange={(e, image) => {
                                                         this.setState({
                                                           selectedValue: y
                                                         })
                                                         // let saveButton = document.getElementById(`save_${a}`)
                                                         if(e.currentTarget.files[0]) {
                                                           // saveButton.style.display = 'inline-block'
                                                           let formData = new FormData();
                                                           formData.append('upload', e.currentTarget.files[0])

                                                           fetch("api/uploadImage", {
                                                             method:"POST",
                                                             body: formData
                                                           }).then(res => {
                                                             M.toast({html: "Image Updated!", classes: "rounded teal"})
                                                             this.populateMenu({}, "default");
                                                           })

                                                           fetch("api/newImage", {
                                                             method:"POST",
                                                             headers: {
                                                                 'Accept': 'application/json',
                                                                 'Content-Type': 'application/json'
                                                             },
                                                             body: JSON.stringify({
                                                               file: {
                                                                 name: e.currentTarget.files[0].name,
                                                                 lastModified: e.currentTarget.files[0].lastModified,
                                                                 lastModifiedDate: e.currentTarget.files[0].lastModifiedDate,
                                                                 webkitRelativePath: e.currentTarget.files[0].webkitRelativePath,
                                                                 size: e.currentTarget.files[0].size,
                                                                 type: e.currentTarget.files[0].type
                                                               },
                                                               old_data: y,
                                                               update:true
                                                             })
                                                           })

                                                         }
                                                       }}
                                                       id={`TextInput-${z}-${a}`}
                                                       label="Upload New"
                                                       name="upload"
                                                       type="file" />
                                                    </div>

                                                     { /* <TextInput type="submit" id={`save_${a}`} style={{ display:"none" }}>Save</TextInput>  */}

                                                 </div>
                                        })
                                      }
                                  </div>
                                </Tab>
                        })
                      }
                    </Tabs>
        } else {
        // else if(this.state.section == "item") {
          return <div> {
                          Object.keys(this.state.currentItem).filter(x=>x!='id' && x!='action' && x!='data_schema' && x!="data").map(x => {
                            return <div style={{"margin":"20px 0"}}>
                                    <label htmlFor={x} style={{"fontSize":"15px"}}>{x}</label>
                                    <TextInput id={x} value={ this.state.currentItem[ `${x}` ] } onChange={() => this.changeItem(event, x, "currentItem")}/>
                                  </div>
                          })
                        }
                        <Button onClick={this.editItemRequest} style={{ "display":"inline" }}>Save</Button>
                        <Confirm
                                 header="Are you sure?"
                                 buttonText="Delete"
                                 text="Once deleted this cannot be undone"
                                 modalStyles={{ "display":"inline", "marginLeft":"10px"}}
                                 actions={
                                          [<Button modal="close" onClick={this.deleteItem} style={{"marginRight":"10px"}}>Yes, Delete</Button>,
                                           <Button modal="close">Cancel</Button>]
                                           }>Delete</Confirm>
                   </div>
        }
        // else if(this.state.section == 'submenu' || this.state.section == "menu") {
        //   return <div> {
        //     Object.keys(this.state.currentItem).filter(x=>x =='name' || x == 'subtitle').map(x => {
        //       return <div style={{"margin":"20px 0"}}>
        //               <label htmlFor={x} style={{"fontSize":"15px"}}>{x}</label>
        //               <TextInput id={x} value={ this.state.currentItem[ `${x}` ] } onChange={() => this.changeItem(event, x, "currentItem")}/>
        //             </div>
        //           })
        //               }
        //               <Button onClick={this.editItemRequest} style={{ "display":"inline" }}>Save</Button>
        //               <Confirm
        //                        header="Are you sure?"
        //                        buttonText="Delete"
        //                        text="Once deleted this cannot be undone"
        //                        modalStyles={{ "display":"inline", "marginLeft":"10px"}}
        //                        actions={
        //                                 [<Button modal="close" onClick={this.deleteItem} style={{"marginRight":"10px"}}>Yes, Delete</Button>,
        //                                  <Button modal="close">Cancel</Button>]
        //                                  }>Delete</Confirm>
        //          </div>
        // }
      }

      changePriceView = (e, type) => {
        if(type == 'request') {
          fetch("api/updatePriceView", {
            method:"POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id:'7',
              showPrice:this.state.prices == true ? 1 : 0
            })
          }).then(res => {
            M.toast({html: "Settings Updated!", classes: "rounded teal"})
            this.populateMenu({}, "default");
          })
        } else {
          this.setState( state => ({
            prices: state.prices == false ? true : false
          }))
        }
      }

      changeItem = (e, x, obj) => {
        let value = this.state[obj];
        value[ `${x}` ] = e.target.value
        this.setState({
          [obj]: value
        })
      }

      editItemRequest = () => {
        let url;
        let request = this.state.request;
        request["id"] = "7";
        request['data'] = this.state.currentItem;

        if(this.state.section == 'item') {
          url = "updateMenuItem"
        } else if(this.state.section == 'submenu') {
          request['super_sub_id'] = this.state.currentItem['id'];
          url = 'updateSubMenu'
        } else if(this.state.section == 'menu') {
          request['sub_id'] = this.state.currentItem['id'];
          url = 'updateMain'
        }

        fetch(`/api/${url} `, {
          method:"POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(request)
        }).then(res => {
          M.toast({html: "Menu Edited!", classes: "rounded teal"})
          this.populateMenu({}, 'default')
        })
      }

      deleteItem = () => {
        let url;
        let request = this.state.request;
        request["id"] = "7";

        if(this.state.section == 'item') {
          url = "deleteMenuItem"
        } else if(this.state.section == 'submenu') {
          request['super_sub_id'] = this.state.currentItem['id'];
          url = 'deleteSubMenu'
        } else if(this.state.section == 'menu') {
          request['sub_id'] = this.state.currentItem['id'];
          url = 'deleteMain'
        }

        fetch(`/api/${url}`, {
          method:"Delete",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(request)
        }).then(res => {
          M.toast({html: "Menu Item Deleted!", classes: "rounded teal"})
          this.populateMenu({}, 'default')
          // fetch("api/get?id=7")
          //   .then(blob => blob.json())
          //   .then(data => {
          //     this.setState({
          //       menu: [...mapped]
          //     })
          //   })
        })
      }

      changeSection = (data, action) => {
        let new_actions = [<Button modal="close" style={{"margin": "0 20px"}}>Close</Button>];
        this.setState({
          currentItem: data,
          section:action,
          actions: new_actions
        })
      }

    render() {
      return (
        <div>
          {
            this.props.mounted ?
            (
              <Modal
                id="adminModal" open={this.props.mounted}
                className="adminModal"
                actions={this.state.actions}
                options={{
                  onOpenStart: () => this.fetchImages(),
                  onCloseEnd:this.props.close
                }}>
                {
                  !this.state.validated ?
                    <div>
                          <div className="brand-logo center mainLogo" style={{ "color":"#26a69a", "margin": "0 auto" }}>Paddy Macs Admin</div>
                          <TextInput value={this.state.email} onChange={() => this.validateEmail(event, 'username')} placeholder="Username" style={{ "marginBottom":"20px !important" }}></TextInput>
                          <TextInput placeholder="Password" password onChange={() => this.validateEmail(event, 'password')}></TextInput>
                    </div>
                      : <div>
                          <Breadcrumb className="teal">
                            <a onClick={() => this.populateMenu({}, 'default')} style={{ "cursor": "pointer" }}>Admin</a>
                            {
                              this.state.crumbs.map(x => {
                                return <a style={{ "cursor":"pointer" }} onClick={() => this.populateMenu(x, x.action)}>{x.name}</a>
                              })
                            }
                          </Breadcrumb>
                          {
                            this.state.section == 'main' ?
                            <Collection>
                              {
                                this.state.display.length ?
                                this.state.display.map(x => {
                                  return <div style={{ "display":"flex", "alignItems":"center", "justifyContent":"center" }}>
                                         <CollectionItem
                                            href
                                            style={{
                                              "cursor": "pointer",
                                              "outline":"none",
                                              "flex":"4" }}
                                            onClick={() => this.populateMenu(x, x.action)}>
                                            {x.name}
                                         </CollectionItem>
                                         {
                                           this.state.showEdit && <i onClick={() => this.changeSection(x, x['action'])}
                                                                     className="material-icons"
                                                                     style={{
                                                                       "float":"right",
                                                                       "padding":"8.5px 3px",
                                                                       "borderBottom":"1px solid #e0e0e0",
                                                                       "background":"#26a69a",
                                                                       "color":"white", "cursor":"pointer" }}>edit</i>
                                         }
                                       </div>
                                }) : <div style={{"padding":"30px"}}>This section has no content yet, why not add some?</div>
                              }
                            </Collection> : this.renderItemInputs()
                          }
                        </div>
                }
              </Modal>
            ) : <div></div>
          }
        </div>
      )
    }
}
